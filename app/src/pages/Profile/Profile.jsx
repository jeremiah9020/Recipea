import {React, useEffect, useState} from 'react';
import Helmet from 'react-helmet'
import Header from '../../components/Header/Header'
import { useNavigate, useSearchParams } from 'react-router-dom';

import {ReactComponent as DefaultProfilePicture}  from '../../assets/profile/default.svg'

import './Profile.scss'

function Profile() {
    const navigate = useNavigate();
    const [searchParams,setSearchParams] = useSearchParams();
    const [editable, setEditable] = useState(false)
    const [username, setUsername] = useState('')
    const [description, setDescription] = useState('')
    const [profilePicture,setProfilePicture] = useState(<DefaultProfilePicture className="Default"/>)
    const [profileBanner,setProfileBanner] = useState(<div style={{"background-color": "rgb(200,200,200)","width":"100%","height":"100%"}}/>)

    async function getAuthenticatedProfile() {
        const response = await fetch('http://localhost:3001/api/profiles/authenticated', {
            method: 'GET',
            credentials: 'include'
        })
        if (response.ok) {
            const profile = await response.json()
            return profile.username
        } else {
            return null
        }
    }

    useEffect(() => {
        async function getData() {
            const searchUsername = searchParams.get('username')
            const authenticatedUsername = await getAuthenticatedProfile()
            if (!searchUsername) {
                if (!authenticatedUsername) {
                    navigate('/')
                } else {
                    searchParams.set('username',authenticatedUsername)
                    setEditable(true)
                    setSearchParams(searchParams)
                }
            }

            const response = await fetch(`http://localhost:3001/api/profiles?username=${searchParams.get('username')}`, {
                method: 'GET',
                credentials: 'include'
            })

            if (!response.ok) {
                navigate('/')
            } else {
                const profile = await response.json()
                if (profile.username === authenticatedUsername) setEditable(true)
                setUsername(profile.username)
                if (profile.description) setDescription(profile.description)
                if (profile.profilepicture) setProfilePicture(<img src={profile.profilepicture} alt="Profile"/>)
                if (profile.profilepicture) setProfileBanner(<img src={profile.profilebanner} alt="Banner"/>)
            }
        }      
        
        getData()
    },[searchParams,setSearchParams,navigate])

    return (
        <div className="Profile">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Recipea | {username}</title>
                <meta name="description" content="Recipea Web Application" />
            </Helmet>
            <Header/>

            <div className="BannerContainer">
                <div className="Nametag">
                    <div class="ProfilePicture">
                        {profilePicture}
                    </div>
                    <div className="NameBox">
                        <div className="Chef">Chef</div>
                        <div className="Username">@{username}</div>
                    </div>
                </div>
                {profileBanner}
            </div>
            <div>
                
            </div>
            {editable && <p>EDITABLE</p>}
        </div>
  )
}

export default Profile;