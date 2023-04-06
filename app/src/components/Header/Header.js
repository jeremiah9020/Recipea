import React from 'react';
import { Link } from "react-router-dom";

import logo from '../../assets/logo.svg';
import title from '../../assets/title.svg';
import './Header.scss'
import { useAuth } from '../../context/authContext';

function Header() {   
    const { isAuthenticated, isLoading, setAuthenticated} = useAuth();

    const logout = async () => {
        await fetch('http://localhost:3001/auth/logout', {
            method: 'POST',
            credentials: 'include'
        })
        setAuthenticated(false)
    }

    return (
        <div className='Header-Bar'>
            <img src={title} className="Header-Title" alt="logo" />
            <img src={logo} className="Header-Icon" alt="logo" />
            {!isLoading && isAuthenticated && <button className="LoginButton" onClick={logout}>Logout</button>}
            {!isLoading && !isAuthenticated && <Link className="LoginButton" to="/login">Login</Link>}
        </div>

    )
}

export default Header;