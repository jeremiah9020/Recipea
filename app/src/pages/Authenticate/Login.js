import './Login.css'

function doSomething() {
    alert(document.getElementById("password").value)
    return false;
}

function Login() {
    return (
        <div className="Form">
            <div className="Centered">
                <label>
                    Username/Email<br/>
                    <input type="text"></input>
                </label>

                <label>
                    Password<br/>
                    <input id="password" type="password"></input>
                </label>
                

                <input type="submit" onClick={doSomething}></input>
            </div>
        </div>
    )
}

export default Login;