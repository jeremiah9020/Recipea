import { useState } from 'react';
import title from '../../../assets/title.svg'
import './Register.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from "universal-cookie";
const cookies = new Cookies();

function Register() {
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

        const url = 'http://localhost:3001/auth/register'
        const json = JSON.stringify(formDataObj)
        const headers = { headers: { 'Content-Type': 'application/json' } }

        try {
            const response = await axios.post(url, json, headers)
            cookies.set("TOKEN", response.data.token)
            navigate('/')
        } catch (e) {
            document.getElementById("GoogleDisabled").classList.remove("Animation")
            document.getElementById("OutlookDisabled").classList.remove("Animation")
            document.getElementById("UsernameTaken").classList.add("Animation")
        }
    }

    const registerWithGoogle = () => {
        document.getElementById("GoogleDisabled").classList.add("Animation")
        document.getElementById("OutlookDisabled").classList.remove("Animation")
        document.getElementById("UsernameTaken").classList.remove("Animation")

    }

    const registerWithOutlook = () => {
        document.getElementById("GoogleDisabled").classList.remove("Animation")
        document.getElementById("OutlookDisabled").classList.add("Animation")
        document.getElementById("UsernameTaken").classList.remove("Animation")
    }

    return (
        <div className="Register">
            <div className="Graphic">
                <img src={title} className="Title" alt="logo" />
            </div>
            <div className="FormContainer">
                <div className="ErrorBox" id="UsernameTaken">
                    Username already taken
                </div>
                <div className="ErrorBox" id="GoogleDisabled">
                    Google authentication not currently enabled
                </div>
                <div className="ErrorBox" id="OutlookDisabled">
                    Outlook authentication not currently enabled
                </div>
                <form onSubmit={submit} id="loginform">
                    <h1>Register</h1>
                    <section className="Input Pad">
                        <input id="email" name="email" placeholder="Email" type="text" autoComplete="email" required autoFocus />
                    </section>
                    <section className="Input Pad">
                        <input id="username" name="username" placeholder="Username" type="text" required/>
                    </section>
                    <section className="Input Pad">
                        <input id="current-password" name="password" placeholder="Password" type="password" autoComplete="current-password" required />
                        {!showPass && <button type="button" className="Toggle" onClick={toggleShowPass}>show</button>}
                        {showPass && <button type="button" className="Toggle" onClick={toggleShowPass}>hide</button>}
                    </section>
                    <section className="Input">
                        <input value="Register" type="submit"/> 
                    </section>

                    <div className="Divider">
                        <span>or</span>
                    </div>

                    <section className="Input Pad">
                        <input value="Register with Google" type="button" onClick={registerWithGoogle}/> 
                    </section>

                    <section className="Input Pad">
                        <input value="Register with Outlook" type="button" onClick={registerWithOutlook}/> 
                    </section>
                </form>

                <div className="JoinContainer">
                    Already have an account? <a href="/login">Login</a>
                </div>
            </div>
        </div>
    )
}

export default Register;