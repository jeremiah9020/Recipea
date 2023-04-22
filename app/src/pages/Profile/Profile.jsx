import {React, useEffect, useState} from 'react';
import Helmet from 'react-helmet'
import Header from '../../components/Header/Header'
import { useNavigate, useSearchParams } from 'react-router-dom';

import {ReactComponent as DefaultProfilePicture}  from '../../assets/profile/default.svg'

import './Profile.scss'
import useRefresh from '../../hooks/refreshHook';
import CardContainer from '../../components/CardContainer/CardContainer';

function Profile() {
    const navigate = useNavigate();
    const [refreshCards,forceRefreshCards] = useRefresh();
    const [refresh,forceRefresh] = useRefresh();
    const [searchParams,setSearchParams] = useSearchParams();
    const [recipes, setRecipes] = useState(null)
    const [editable, setEditable] = useState(false)
    const [userid, setUserid] = useState(null)
    const [username, setUsername] = useState('')
    const [description, setDescription] = useState('')
    const [descriptionChanged, setDescriptionChanged] = useState(false)
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
                setUserid(profile.userid)

                if (profile.description != null) setDescription(profile.description)
                if (profile.profilepicture != null) setProfilePicture(<img src={'http://localhost:3001/static/' + profile.profilepicture} alt="Profile"/>)
                if (profile.profilebanner != null) setProfileBanner(<img src={'http://localhost:3001/static/' + profile.profilebanner} alt="Banner"/>)
            }
        }      
        
        getData()
    },[searchParams,setSearchParams,navigate])

    useEffect(() => {
        async function populateCardContainer() {
          // get the recipes we want to include in the container (all of them in this case)
          let response = await fetch(`http://localhost:3001/api/recipes?userid=${userid}`, {
            method: 'GET',
            credentials: 'include'
          })
          const recipes = await response.json()
    
          // set the recipes prop of the container and that's it
          setRecipes(recipes);
        }
        populateCardContainer()
      }, [userid,refreshCards])

    function textAreaChangeHandler({target: {value}}) {
        setDescriptionChanged(description !== value)
    }

    function textAreaBeforeInputHandler(e) {
        const value = e.target.value + e.data
        const byLine = value.split('\n')

        let length = 0
        for (let line of byLine) {
            length += Math.max(line.length,40)
        }

        if (length > 200) e.preventDefault()
    }

    async function updateProfile(formData) {
        const url = 'http://localhost:3001/api/profiles/updateinfo'
        return await fetch(url, {
            method: 'PATCH',
            credentials: 'include',
            body: formData
        });
    }

    async function submitDescriptionChange() {
        const formData = new FormData()
        const description = document.getElementById("ProfileDescription").value
        formData.append("description",description)

        await updateProfile(formData)

        setDescription(description)
        setDescriptionChanged(false)
    }

    async function changeProfilePicture({target}) {
        const formData = new FormData()
        const profilepicture = target.files[0]

        //Resets the files
        target.files = new DataTransfer().files

        formData.append("profilepicture",profilepicture)

        const response = await updateProfile(formData)
        const profile = await response.json()
        setProfilePicture(<img src={'http://localhost:3001/static/' + profile.profilepicture} alt="Profile"/>)
        forceRefresh()
    }

    async function changeProfileBanner({target}) {
        const formData = new FormData()
        const profilebanner = target.files[0]

        //Resets the files
        target.files = new DataTransfer().files

        formData.append("profilebanner",profilebanner)

        const response = await updateProfile(formData)
        const profile = await response.json()
        setProfileBanner(<img src={'http://localhost:3001/static/' + profile.profilebanner} alt="Profile"/>)
    }

    return (
        <div className="Profile">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Recipea | {username}</title>
                <meta name="description" content="Recipea Web Application" />
            </Helmet>
            <Header refresh={refresh}/>

            <div className="BannerContainer">
                {profileBanner}
                {editable &&
                <label className="BannerInput">
                    <input type="file" accept="image/jpeg, image/png, image/jpg" onInput={changeProfileBanner}/>
                </label>}
                <div className="Nametag">
                    <div class="ProfilePicture">
                        {profilePicture}
                        {editable &&
                        <label className="ImageInput">
                            <input type="file" accept="image/jpeg, image/png, image/jpg" onInput={changeProfilePicture}/>
                        </label>}
                    </div>
                    <div className="NameBox">
                        <div className="Chef">Chef</div>
                        <div className="Username">@{username}</div>
                    </div>
                </div>
            </div>
            <div className="DescriptionContainer">
                <textarea 
                    defaultValue={description} 
                    class="DescriptionArea" 
                    id="ProfileDescription" 
                    readOnly={!editable} 
                    onBeforeInput={textAreaBeforeInputHandler} 
                    onChange={textAreaChangeHandler}/>
               

                {editable && descriptionChanged && 
                <input className="SaveDescriptionChange" type="button" value="SAVE" onClick={submitDescriptionChange}/>}
            </div>

            <CardContainer forceRefresh={forceRefreshCards} recipes={recipes}/>
        </div>
  )
}

export default Profile;