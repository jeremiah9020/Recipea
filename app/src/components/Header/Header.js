import React, { useEffect } from 'react';
import { Link} from "react-router-dom";

import logo from '../../assets/logo.svg';
import title from '../../assets/title.svg';
import Cookies from "universal-cookie";
import './Header.css'
const cookies = new Cookies();

function Header(props) {    
    useEffect(() => {
        const cookieToken = cookies.get("TOKEN") || ""
        props.setToken(cookieToken)
    })

    const logout = () => {
        cookies.remove("TOKEN")
        props.setToken("")
    }

    return (
        <div className='Header-Bar'>
            <img src={title} className="Header-Title" alt="logo" />
            <img src={logo} className="Header-Icon" alt="logo" />
            {props.token === '' && <Link className="LoginButton" to="/login">Login</Link>}
            {props.token !== '' && <button className="LoginButton" onClick={logout}>Logout</button>}
        </div>
    )
}

export default Header;