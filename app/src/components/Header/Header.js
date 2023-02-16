import React from 'react';
import { Link } from "react-router-dom";
import logo from '../../assets/logo.svg';
import title from '../../assets/title.svg';
import './Header.css';

function Header() {
    return (
        <div className='Header-Bar'>
            <img src={title} className="Header-Title" alt="logo" />
            <img src={logo} className="Header-Icon" alt="logo" />
            <Link className="Login" to="/login">Login</Link>
        </div>
    )
}

export default Header;