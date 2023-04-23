import {React, useState, useEffect} from 'react'
import ExtendedCard from '../ExtendedCard/ExtendedCard';
import StarRating from '../StarRating/StarRating';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import './Card.scss';

function Card(props) {
    const navigate = useNavigate();
    const [ingredients, setIngredients] = useState([]);
    const [tags, setTags] = useState([]);
    const [imageURL, setImageURL] = useState();
    const [deletable, setDeletable] = useState(false);
    const { isAuthenticated, isLoading } = useAuth();
    const [current_userid, setCurrentUserId] = useState(null);

    useEffect(() => {
        setDeletable(false)
        async function getUserProfileData() {
            const response = await fetch(`http://localhost:3001/api/profiles/authenticated`, {
                method: 'GET',
                credentials: 'include'
            })

            const profile = await response.json()
            if (profile && profile.userid) {
                if (profile.userid === props.recipe.userid) setDeletable(true)
            }
        } 
        getUserProfileData()
    },[props.recipe.userid])

    useEffect(() => {
        async function getUserProfileData() {
            const response = await fetch(`http://localhost:3001/api/profiles/authenticated`, {
                method: 'GET',
                credentials: 'include'
            })
            const user_data = await response.json()
            setCurrentUserId(user_data?.userid)
        }   
        getUserProfileData()
    },[])

    useEffect(() => {
        setIngredients(() => {
            const ingredient_string = props?.recipe?.ingredients;
            if (ingredient_string)
            {
                let arr = ingredient_string.split(':');

                // only display the first 7 ingredients in the card view
                if (arr.length > 7)
                {
                    arr = arr.slice(0, 7);
                    arr.push('...');
                }
                return arr;
            }

            return [];
        })

        setTags(() => {
            const tag_string = props?.recipe?.tags;
            if (tag_string)
            {
                return tag_string.split(':');
            }

            return [];
        })

        setImageURL('http://localhost:3001/static/' + props.recipe.image)

    }, [props.recipe.image, props.recipe?.ingredients, props.recipe?.tags]);

    function clickCard()
    {
        props.setExtendedCard(<ExtendedCard setExtendedCard={props.setExtendedCard} user={props.user} recipe={props.recipe} imageURL={imageURL} ingredients={ingredients} tags={tags} />)
        props.setModalShow(true);
    }

    async function CookbookClicked(event)
    {
        event.stopPropagation();

        if (isAuthenticated)
        {
            // add recipe to user's default cookbook
            console.log(props.user);
            console.log(props.recipe);
            const url = 'http://localhost:3001/api/cookbook'
            await fetch(url, {
                method: 'PATCH',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userid: current_userid,
                    cookbookname: 'default',
                    recipes: props.recipe.id
                })
            })

            // create successful alert
            props.setToastContent(`Added ${props.recipe.title} to your cookbook`);
        }
        else
        {
            props.setToastContent(`Failed to add ${props.recipe.title} to your cookbook. You must be signed in`);
        }
    }

    function ShareClicked(event)
    {
        event.stopPropagation();

        navigator.clipboard.writeText(`http://localhost:3000/?recipeid=${props.recipe.id}`);

        // generate url for recipe

        // initiate share
        props.setToastContent(`Copied ${props.recipe.title} to clipboard`);
    }

    function handleProfileClick(event)
    {
        // prevent modal trigger
        event.stopPropagation();

        navigate(`/profile?username=${props.user.username}`);
    }

    async function handleDeleteRecipe(event) {
        event.stopPropagation()

        // fetch request to update rating
        const url = `http://localhost:3001/api/recipes`;
        const body = {recipeid: props.recipe.id};

        const response = await fetch(url, {
            method: 'DELETE',
            cache: 'no-cache',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(body)
        });

        props.forceRefresh()
    }

  return (
    <div className='Card Hoverable' onClick={clickCard}>
        {deletable && isAuthenticated && <div className="Deletable" onClick={handleDeleteRecipe}>
            DELETE
        </div>}
        <div className="Center">
            <div className="LocalCardContainer">
                <div className="ImageContainer">
                    <img className="Image" src={imageURL} alt='none'/>
                </div>
                <div className="TitleContainer">
                    <div className="LeftContainer">
                        <div className="ProfileContainer" onClick={handleProfileClick}>
                            <div className="ProfilePictureContainer">
                                <img className="ProfilePicture" src={'http://localhost:3001/static/' + props.user.profilepicture} alt='none'/>
                            </div>
                            <div className="ProfileName">@{props.user.username}</div>
                        </div>
                        <div className="Title">{props.recipe.title}</div>
                    </div>
                    <div className="RightContainer">
                        <div className="StarContainer">
                            <StarRating refresh={props.refresh} recipeid={props?.recipe?.id}/>
                        </div>
                        <div className="TimeContainer">
                            <svg width="30" height="30" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.5833 19.277L24.1458 22.8395C24.4361 23.1298 24.5812 23.4929 24.5812 23.9289C24.5812 24.3648 24.4361 24.7406 24.1458 25.0562C23.8291 25.3729 23.4528 25.5312 23.0169 25.5312C22.5809 25.5312 22.2052 25.3729 21.8895 25.0562L18.525 21.6916C18.1555 21.3222 17.8784 20.9132 17.6937 20.4645C17.509 20.0159 17.4166 19.5277 17.4166 19V14.25C17.4166 13.8013 17.5686 13.425 17.8726 13.121C18.1766 12.817 18.5524 12.6656 19 12.6666C19.4486 12.6666 19.8249 12.8186 20.1289 13.1226C20.4329 13.4266 20.5843 13.8024 20.5833 14.25V19.277ZM19 6.33329C19.4486 6.33329 19.8249 6.48529 20.1289 6.78929C20.4329 7.09329 20.5843 7.46907 20.5833 7.91663C20.5833 8.36524 20.4313 8.74154 20.1273 9.04554C19.8233 9.34954 19.4475 9.50102 19 9.49996C18.5513 9.49996 18.175 9.34796 17.871 9.04396C17.567 8.73996 17.4156 8.36418 17.4166 7.91663C17.4166 7.46802 17.5686 7.09171 17.8726 6.78771C18.1766 6.48371 18.5524 6.33224 19 6.33329ZM31.6666 19C31.6666 19.4486 31.5146 19.8249 31.2106 20.1289C30.9066 20.4329 30.5308 20.5843 30.0833 20.5833C29.6347 20.5833 29.2584 20.4313 28.9544 20.1273C28.6504 19.8233 28.4989 19.4475 28.5 19C28.5 18.5513 28.652 18.175 28.956 17.871C29.26 17.567 29.6357 17.4156 30.0833 17.4166C30.5319 17.4166 30.9082 17.5686 31.2122 17.8726C31.5162 18.1766 31.6677 18.5524 31.6666 19ZM19 28.5C19.4486 28.5 19.8249 28.652 20.1289 28.956C20.4329 29.26 20.5843 29.6357 20.5833 30.0833C20.5833 30.5319 20.4313 30.9082 20.1273 31.2122C19.8233 31.5162 19.4475 31.6677 19 31.6666C18.5513 31.6666 18.175 31.5146 17.871 31.2106C17.567 30.9066 17.4156 30.5308 17.4166 30.0833C17.4166 29.6347 17.5686 29.2584 17.8726 28.9544C18.1766 28.6504 18.5524 28.4989 19 28.5ZM9.49996 19C9.49996 19.4486 9.34796 19.8249 9.04396 20.1289C8.73996 20.4329 8.36418 20.5843 7.91663 20.5833C7.46802 20.5833 7.09171 20.4313 6.78771 20.1273C6.48371 19.8233 6.33224 19.4475 6.33329 19C6.33329 18.5513 6.48529 18.175 6.78929 17.871C7.09329 17.567 7.46907 17.4156 7.91663 17.4166C8.36524 17.4166 8.74154 17.5686 9.04554 17.8726C9.34954 18.1766 9.50102 18.5524 9.49996 19ZM19 34.8333C16.8097 34.8333 14.7513 34.4174 12.825 33.5856C10.8986 32.7538 9.22288 31.626 7.79788 30.202C6.37288 28.777 5.24502 27.1013 4.41429 25.175C3.58357 23.2486 3.16768 21.1902 3.16663 19C3.16663 16.8097 3.58252 14.7513 4.41429 12.825C5.24607 10.8986 6.37393 9.22288 7.79788 7.79788C9.22288 6.37288 10.8986 5.24502 12.825 4.41429C14.7513 3.58357 16.8097 3.16768 19 3.16663C21.1902 3.16663 23.2486 3.58252 25.175 4.41429C27.1013 5.24607 28.777 6.37393 30.202 7.79788C31.627 9.22288 32.7554 10.8986 33.5872 12.825C34.419 14.7513 34.8343 16.8097 34.8333 19C34.8333 21.1902 34.4174 23.2486 33.5856 25.175C32.7538 27.1013 31.626 28.777 30.202 30.202C28.777 31.627 27.1013 32.7554 25.175 33.5872C23.2486 34.419 21.1902 34.8343 19 34.8333ZM19 31.6666C22.5361 31.6666 25.5312 30.4395 27.9854 27.9854C30.4395 25.5312 31.6666 22.5361 31.6666 19C31.6666 15.4638 30.4395 12.4687 27.9854 10.0145C25.5312 7.56038 22.5361 6.33329 19 6.33329C15.4638 6.33329 12.4687 7.56038 10.0145 10.0145C7.56038 12.4687 6.33329 15.4638 6.33329 19C6.33329 22.5361 7.56038 25.5312 10.0145 27.9854C12.4687 30.4395 15.4638 31.6666 19 31.6666Z" fill="#616161" />
                            </svg>
                            <div className="Time">{props.recipe.time}</div>
                        </div>
                    </div>
                </div>
                <div className="ContentContainer">
                    <div className="InteractableContainer">
                        <div className="TagContainer">
                            {
                                tags.map(tag => {
                                    return (<div className='Tag Teal'>
                                        #{tag}
                                    </div>)
                                })
                            }
                        </div>
                        <div className="ShareContainer">
                            <svg className="Icon" onClick={CookbookClicked} width="30" height="30" viewBox="0 0 49 49" fill="black" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.25 44.9167C11.127 44.9167 10.1654 44.5165 9.36509 43.7162C8.56475 42.9159 8.16527 41.9549 8.16663 40.8334V8.16671C8.16663 7.04379 8.5668 6.08217 9.36713 5.28184C10.1675 4.4815 11.1284 4.08202 12.25 4.08338H36.75C37.8729 4.08338 38.8345 4.48354 39.6348 5.28388C40.4352 6.08421 40.8347 7.04516 40.8333 8.16671V40.8334C40.8333 41.9563 40.4331 42.9179 39.6328 43.7183C38.8325 44.5186 37.8715 44.9181 36.75 44.9167H12.25ZM12.25 40.8334H36.75V8.16671H32.6666V20.6719C32.6666 21.0803 32.4965 21.3783 32.1562 21.5662C31.8159 21.754 31.4757 21.7452 31.1354 21.5396L27.5625 19.3959L23.9895 21.5396C23.6493 21.7438 23.309 21.7526 22.9687 21.5662C22.6284 21.3797 22.4583 21.0816 22.4583 20.6719V8.16671H12.25V40.8334Z" fill="black" />
                            </svg>
                            <svg className="Icon" onClick={ShareClicked} width="30" height="30" viewBox="0 0 49 49" fill="black" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.25 46.9583C11.127 46.9583 10.1654 46.5581 9.36509 45.7578C8.56475 44.9575 8.16527 43.9965 8.16663 42.875V20.4166C8.16663 19.2937 8.5668 18.3321 9.36713 17.5318C10.1675 16.7314 11.1284 16.3319 12.25 16.3333H18.375V20.4166H12.25V42.875H36.75V20.4166H30.625V16.3333H36.75C37.8729 16.3333 38.8345 16.7335 39.6348 17.5338C40.4352 18.3341 40.8347 19.2951 40.8333 20.4166V42.875C40.8333 43.9979 40.4331 44.9595 39.6328 45.7598C38.8325 46.5602 37.8715 46.9597 36.75 46.9583H12.25ZM22.4583 32.6666V9.851L19.1916 13.1177L16.3333 10.2083L24.5 2.04163L32.6666 10.2083L29.8083 13.1177L26.5416 9.851V32.6666H22.4583Z" fill="black" />
                            </svg>
                        </div>
                    </div>
                    <div className="IngredientsContainer">
                        {
                            ingredients.map(ingredient => {
                                return (<div>
                                    • {ingredient.trim()}
                                </div>)
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
        {alert}
    </div>
  );
}

export default Card;