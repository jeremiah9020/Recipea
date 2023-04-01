import { useState } from 'react';
import title from '../../../assets/title.svg'
import './Login.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from "universal-cookie";
const cookies = new Cookies();

function Login() {
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

        const url = 'http://localhost:3001/auth/login'
        const json = JSON.stringify(formDataObj)
        const headers = { headers: { 'Content-Type': 'application/json' } }

        try {
            const response = await axios.post(url, json, headers)
            cookies.set("TOKEN", response.data)
            navigate('/')
        } catch (e) {
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
                <img src={title} className="Title" alt="logo" />
            </div>
            <div className="FormContainer">
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
                <form onSubmit={submit} id="loginform">
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
                        <input value="Login" type="submit"/> 
                    </section>

                    <div className="Divider">
                        <span>or</span>
                    </div>

                    <section className="Input Pad">
                        <input value="Sign in with Google" type="button" onClick={signinWithGoogle}/> 
                    </section>

                    <section className="Input Pad">
                        <input value="Sign in with Outlook" type="button" onClick={signinWithOutlook}/> 
                    </section>
                </form>

                <div className="JoinContainer">
                    New to Recipea? <a href="/register">Join now</a>
                </div>
            </div>
        </div>
    )
}

export default Login;