import React from 'react';
import logo from '../../assets/logo.svg';
import title from '../../assets/title.svg';
import './Header.css';

function Header() {
    return (
        <div className='Header-Bar'>
            <img src={title} className="Header-Title" alt="logo" />
            <img src={logo} className="Header-Icon" alt="logo" />
            <p>Login, other stuff!</p>
        </div>
    )
}

export default Header;