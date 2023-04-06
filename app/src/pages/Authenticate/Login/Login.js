import { useState } from 'react';
import title from '../../../assets/title.svg'
import './Login.scss'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/authContext';

function Login() {
    const { setAuthenticated } = useAuth();
    const [showPass, setShowPass] = useState(false);
    const navigate = useNavigate();

    const toggleShowPass = () => {
        let input = document.getElementById('current-password')
        if (showPass) {
            input.type = "password"
        } else {
            input.type = "text"
        }
        setShowPass(!showPass)
    }

    const submit = async (e) => {
        e.preventDefault()

        const formData = new FormData(document.getElementById("loginform"))
        var formDataObj = {};
        formData.forEach((value, key) => formDataObj[key] = value);

        const response = await fetch('http://localhost:3001/auth/login', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formDataObj)
        })

        if (response.ok) {
            setAuthenticated(true)
            navigate('/')
        } else {
            document.getElementById("GoogleDisabled").classList.remove("Animation")
            document.getElementById("OutlookDisabled").classList.remove("Animation")
            document.getElementById("UsernamePassword").classList.add("Animation")
            document.getElementById("ForgotPassword").classList.remove("Animation")
        }
    }

    const signinWithGoogle = () => {
        document.getElementById("GoogleDisabled").classList.add("Animation")
        document.getElementById("OutlookDisabled").classList.remove("Animation")
        document.getElementById("UsernamePassword").classList.remove("Animation")
        document.getElementById("ForgotPassword").classList.remove("Animation")
    }

    const signinWithOutlook = () => {
        document.getElementById("GoogleDisabled").classList.remove("Animation")
        document.getElementById("OutlookDisabled").classList.add("Animation")
        document.getElementById("UsernamePassword").classList.remove("Animation")
        document.getElementById("ForgotPassword").classList.remove("Animation")
    }

    const generateForgotPassword = () => {
        document.getElementById("GoogleDisabled").classList.remove("Animation")
        document.getElementById("OutlookDisabled").classList.remove("Animation")
        document.getElementById("UsernamePassword").classList.remove("Animation")
        document.getElementById("ForgotPassword").classList.add("Animation")
    }

    return (
        <div className="Login">
            <div className="Graphic">
                <img src={title} className="Title" alt="logo" onClick={() => { navigate('/') }} />
            </div>
            <div className="FormContainer">
                <form onSubmit={submit} id="loginform">
                    <div className="ErrorBox" id="UsernamePassword">
                        Incorrect username/password
                    </div>
                    <div className="ErrorBox" id="GoogleDisabled">
                        Google authentication not currently enabled
                    </div>
                    <div className="ErrorBox" id="OutlookDisabled">
                        Outlook authentication not currently enabled
                    </div>
                    <div className="ErrorBox" id="ForgotPassword">
                        Forgot password is not currently enabled
                    </div>
                    <h1>Sign in</h1>
                    <section className="Input Pad">
                        <input id="username" name="username" placeholder="Username" type="text" autoComplete="username" required autoFocus />
                    </section>
                    <section className="Input">
                        <input id="current-password" name="password" placeholder="Password" type="password" autoComplete="current-password" required />
                        {!showPass && <button type="button" className="Toggle" onClick={toggleShowPass}>show</button>}
                        {showPass && <button type="button" className="Toggle" onClick={toggleShowPass}>hide</button>}
                    </section>
                    <section className="Forgot">
                        <button type="button" onClick={generateForgotPassword}>Forgot password?</button>
                    </section>
                    <section className="Input">
                        <input value="Login" type="submit" />
                    </section>

                    <div className="Divider">
                        <span>or</span>
                    </div>

                    <section className="Input Pad">
                        <input value="Sign in with Google" type="button" onClick={signinWithGoogle} />
                    </section>

                    <section className="Input Pad">
                        <input value="Sign in with Outlook" type="button" onClick={signinWithOutlook} />
                    </section>
                </form>

                <div className="JoinContainer">
                    New to Recipea? <Link to="/register">Sign up</Link>
                </div>
            </div>
        </div>
    )
}

export default Login;