import { useState } from 'react';
import title from '../../../assets/title.svg'
import './Register.scss'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/authContext';

function Register() {
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

        //validate email
        if (/\S+@\S+\.\S+/.test(formDataObj.email)) {
            const response = await fetch('http://localhost:3001/auth/register', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formDataObj)
            })
    
            if (response.ok) {
                setAuthenticated(true)
                navigate('/')
            } else {
                const err = await response.json()
                const type = err?.msg?.fields[0]
                
                if (type === 'email') {
                    document.getElementById("UsernameTaken").classList.remove("Animation")
                    document.getElementById("EmailTaken").classList.add("Animation")
                } else if (type === 'username') {
                    document.getElementById("EmailTaken").classList.remove("Animation")
                    document.getElementById("UsernameTaken").classList.add("Animation")
                }
                document.getElementById("GoogleDisabled").classList.remove("Animation")
                document.getElementById("OutlookDisabled").classList.remove("Animation")
                document.getElementById("InvalidEmail").classList.remove("Animation")

            }  
        } else {
            document.getElementById("InvalidEmail").classList.add("Animation")
            document.getElementById("GoogleDisabled").classList.remove("Animation")
            document.getElementById("OutlookDisabled").classList.remove("Animation")
            document.getElementById("UsernameTaken").classList.remove("Animation")
            document.getElementById("EmailTaken").classList.remove("Animation")
        }   
    }

    const registerWithGoogle = () => {
        document.getElementById("GoogleDisabled").classList.add("Animation")
        document.getElementById("OutlookDisabled").classList.remove("Animation")
        document.getElementById("UsernameTaken").classList.remove("Animation")
        document.getElementById("EmailTaken").classList.remove("Animation")
        document.getElementById("InvalidEmail").classList.remove("Animation")


    }

    const registerWithOutlook = () => {
        document.getElementById("GoogleDisabled").classList.remove("Animation")
        document.getElementById("OutlookDisabled").classList.add("Animation")
        document.getElementById("UsernameTaken").classList.remove("Animation")
        document.getElementById("EmailTaken").classList.remove("Animation")
        document.getElementById("InvalidEmail").classList.remove("Animation")
    }

    return (
        <div className="Register">
            <div className="Graphic">
                <img src={title} className="Title" alt="logo" onClick={() => { navigate('/') }} />
            </div>
            <div className="FormContainer">
                <form onSubmit={submit} id="loginform">
                    <div className="ErrorBox" id="InvalidEmail">
                        Email is invalid
                    </div>
                    <div className="ErrorBox" id="UsernameTaken">
                        Username already used
                    </div>
                    <div className="ErrorBox" id="EmailTaken">
                        Email already used
                    </div>
                    <div className="ErrorBox" id="GoogleDisabled">
                        Google authentication not currently enabled
                    </div>
                    <div className="ErrorBox" id="OutlookDisabled">
                        Outlook authentication not currently enabled
                    </div>
                    <h1>Register</h1>
                    <section className="Input Pad">
                        <input id="email" name="email" placeholder="Email" type="text" autoComplete="email" required autoFocus />
                    </section>
                    <section className="Input Pad">
                        <input id="username" name="username" placeholder="Username" type="text" required />
                    </section>
                    <section className="Input Pad">
                        <input id="current-password" name="password" placeholder="Password" type="password" autoComplete="current-password" required />
                        {!showPass && <button type="button" className="Toggle" onClick={toggleShowPass}>show</button>}
                        {showPass && <button type="button" className="Toggle" onClick={toggleShowPass}>hide</button>}
                    </section>
                    <section className="Input">
                        <input value="Register" type="submit" />
                    </section>

                    <div className="Divider">
                        <span>or</span>
                    </div>

                    <section className="Input Pad">
                        <input value="Register with Google" type="button" onClick={registerWithGoogle} />
                    </section>

                    <section className="Input Pad">
                        <input value="Register with Outlook" type="button" onClick={registerWithOutlook} />
                    </section>
                </form>

                <div className="JoinContainer">
                    Already have an account? <Link to="/login">Login</Link>
                </div>
            </div>
        </div>
    )
}

export default Register;