import React, { useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";

import logo from '../../assets/logo.svg';
import title from '../../assets/title.svg';

import {ReactComponent as HomeIcon}  from '../../assets/navbar/home.svg'
import {ReactComponent as CookbookIcon}  from '../../assets/navbar/cookbook.svg'
import {ReactComponent as AddIcon} from '../../assets/navbar/add.svg'
import {ReactComponent as SearchIcon}  from '../../assets/navbar/search.svg'

import './Header.scss'
import { useAuth } from '../../context/authContext';
import NavProfile from '../NavProfile/NavProfile'

function Header({refresh}) {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    useEffect(() => {
        const navigationButtons = document.getElementsByClassName('NavigationButton')
        for (let button of navigationButtons) {
            const path = button.attributes['id'].value.split('_')[2]
            if (path  === location.pathname) {
                button.classList.add('Selected')
            } else {
                button.classList.remove('Selected')
            }
        }
    }, [location])

    useEffect(() => {
        const navigationButtons = document.getElementsByClassName('NavigationDisableable')

        for (let button of navigationButtons) {
            if (isAuthenticated) {
                button.classList.remove('Disabled')
            } else {
                button.classList.add('Disabled')
            }
        }
    }, [isAuthenticated])

    return (
        <div className='HeaderBar'>
            <img src={title} className="Title" alt="logo" />
            <img src={logo} className="Icon" alt="logo" />

            <div className='Navigation'>
                <Link className="NavigationButton" id="navigation_button_/" to="/">
                    <HomeIcon />
                </Link>

                <Link className="NavigationButton" id="navigation_button_/search" to="/search">
                    <SearchIcon />
                </Link>

                <Link className="NavigationButton NavigationDisableable" id="navigation_button_/cookbook" to={isAuthenticated? "/cookbook" : "#"}>
                    <CookbookIcon />
                </Link>

                <Link className="NavigationButton NavigationDisableable" id="navigation_button_/create-recipe" to={isAuthenticated? "/create-recipe": "#"}>
                    <AddIcon />
                </Link>
            </div>
            <div className="Profile">
            {!isLoading && !isAuthenticated && <Link className="LoginButton" to="/login">Login</Link>}
            {!isLoading && isAuthenticated && <NavProfile refresh={refresh}/>}
            </div>
        </div>

    )
}

export default Header;