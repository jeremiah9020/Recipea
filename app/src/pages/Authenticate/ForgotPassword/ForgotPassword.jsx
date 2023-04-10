import title from '../../../assets/title.svg'
import './ForgotPassword.scss'
import { Link, useNavigate } from 'react-router-dom';

function ForgotPassword() {
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault()

        const formData = new FormData(document.getElementById("loginform"))
        var formDataObj = {};
        formData.forEach((value, key) => formDataObj[key] = value);

        const response = await fetch('http://localhost:3001/auth/forgotpassword', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formDataObj)
        })

        if (response.ok) {
            document.getElementById("AccountFound").classList.add("Animation")
            document.getElementById("NoAccountFound").classList.remove("Animation")

        } else {
            document.getElementById("NoAccountFound").classList.add("Animation")
            document.getElementById("AccountFound").classList.remove("Animation")
        }
    }

    return (
        <div className="ForgotPassword">
            <div className="Graphic">
                <img src={title} className="Title" alt="logo" onClick={() => { navigate('/') }} />
            </div>
            <div className="FormContainer">
                <form onSubmit={submit} id="loginform">
                    <div className="ErrorBox" id="NoAccountFound">
                        No account registered with that email
                    </div>
                    <div className="SuccessBox" id="AccountFound">
                        We have sent an email to that account
                    </div>
                    <h1>Forgot Password?</h1>
                    <section className="Input Pad">
                        <input id="email" name="email" placeholder="Email" type="text" autoComplete="email" required autoFocus />
                    </section>
                    <section className="Input">
                        <input value="Send Reset Link" type="submit" />
                    </section>
                </form>

                <div className="JoinContainer">
                    Remember Password? <Link to="/login">Login</Link>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword;