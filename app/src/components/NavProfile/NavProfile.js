import { useAuth } from "../../context/authContext";

import {ReactComponent as DefaultProfilePicture}  from '../../assets/profile/default.svg'
import {ReactComponent as AlertsIcon}  from '../../assets/profile/alerts.svg'

import DropdownMenu from '../Dropdown/DropdownMenu';
import DropdownButton from '../Dropdown/DropdownButton';
import DropdownLink from '../Dropdown/DropdownLink';
import DropDownItem from '../Dropdown/DropdownItem';

import './NavProfile.scss'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function NavProfile() {
    const { setAuthenticated } = useAuth();
    const [profilePicture,setProfilePicture] = useState(<DefaultProfilePicture className="Default"/>)
    const [showAlerts,setShowAlerts] = useState(false)
    const [showProfile,setShowProfile] = useState(false)
    const navigate = useNavigate()

    function openAlerts() {
        setShowAlerts((old) => !old)
        setShowProfile(false)
    }

    function openProfile() {
        setShowAlerts(false)
        setShowProfile((old) => !old)
    }

    const logout = async () => {
        await fetch('http://localhost:3001/auth/logout', {
            method: 'POST',
            credentials: 'include'
        })
        setAuthenticated(false)
        navigate('/')
    }

    useEffect(() => {
        async function getUserProfileData() {
            const response = await fetch(`http://localhost:3001/api/profiles/authenticated`, {
                method: 'GET',
                credentials: 'include'
            })

            const profile = await response.json()
            if (profile.profilepicture) setProfilePicture(<img src={profile.profilepicture} alt="Profile"/>)
        } 
        getUserProfileData()
    })

    return (
        <div className="NavProfile">
            <div className="Badge" onClick={openAlerts}>
                <AlertsIcon className="Alert"/>
            </div>

            <div className="Badge" onClick={openProfile}>
                {profilePicture}
            </div>
            
            <div>
                {showAlerts && 
                <DropdownMenu position="67px 35px">
                    <DropDownItem>Nothing here...</DropDownItem>
                </DropdownMenu>}

                {showProfile && 
                <DropdownMenu position="7px 35px">
                    <DropdownLink Name="Profile" To="/profile"/>
                    <DropdownButton Name="Logout" Click={logout}/>
                </DropdownMenu>}
            </div>
        </div>
    )
}

export default NavProfile;