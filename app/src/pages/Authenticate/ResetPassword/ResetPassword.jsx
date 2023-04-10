import { useState } from 'react';
import title from '../../../assets/title.svg'
import './ResetPassword.scss'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../../context/authContext';

function ResetPassword() {
    const { setAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [searchParams,] = useSearchParams();
    const [showPass,setShowPass] = useState(false)

    const toggleShowPass = () => {
        let input = document.getElementById('new')
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
        formDataObj.token = searchParams.get('token')

        const response = await fetch('http://localhost:3001/auth/resetpassword', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formDataObj)
        })

        if (response.ok) {
            setAuthenticated(true)
            navigate('/')
        } else {
            document.getElementById("TokenExpired").classList.add("Animation")

        }
    }

    return (
        <div className="ResetPassword">
            <div className="Graphic">
                <img src={title} className="Title" alt="logo" onClick={() => { navigate('/') }} />
            </div>
            <div className="FormContainer">
                <form onSubmit={submit} id="loginform">
                    <div className="ErrorBox" id="TokenExpired">
                        Your reset token has expired
                    </div>
                    <h1>Reset Password</h1>
                    <section className="Input Pad">
                        <input id="new" name="new" placeholder="Password" type="password" autoComplete="current-password" required />
                        {!showPass && <button type="button" className="Toggle" onClick={toggleShowPass}>show</button>}
                        {showPass && <button type="button" className="Toggle" onClick={toggleShowPass}>hide</button>}
                    </section>
                    <section className="Input">
                        <input value="Reset" type="submit" />
                    </section>
                </form>

                <div className="JoinContainer">
                    Remember Password? <Link to="/login">Login</Link>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword;