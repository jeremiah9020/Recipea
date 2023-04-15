import {React, useState, useEffect} from 'react'
import ExtendedCard from '../ExtendedCard/ExtendedCard';
import Alert from 'react-bootstrap/Alert';
import Rating from '@mui/material/Rating';
import './Card.scss';

function Card(props) {
    const [ingredients, setIngredients] = useState([]);
    const [tags, setTags] = useState([]);
    const [imageURL, setImageURL] = useState();
    const [value, setValue] = useState(0); // for stars

    useEffect(() => {
        setIngredients(() => {
            const ingredient_string = props?.recipe?.ingredients;
            if (ingredient_string)
            {
                let arr = ingredient_string.split(':');
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

    const [hoverable, setHoverable] = useState('Hoverable');
    function toggleHoverable()
    {
        setHoverable(prev => {
            if (prev === 'Hoverable')
            {
                return 'Not-Hoverable';
            }
            else
            {
                return 'Hoverable';
            }
        })
    }

    function clickCard()
    {
        props.setExtendedCard(<ExtendedCard setExtendedCard={props.setExtendedCard} toggleHoverable={toggleHoverable} user={props.user} recipe={props.recipe} imageURL={imageURL} ingredients={ingredients} tags={tags}/>)
        toggleHoverable();
    }

    function CookbookClicked(event)
    {
        event.stopPropagation();
        // add recipe to user's default cookbook

        // create successful alert
        props.setToastContent(`Added ${props.recipe.title} to your cookbook`);
    }

    function FollowClicked(event)
    {
        event.stopPropagation();

        props.setToastContent(`Now following ${props.user.username}`);
    }

    function ShareClicked(event)
    {
        event.stopPropagation();

        // initiate upload
    }

    function UploadClicked(event)
    {
        event.stopPropagation();

        // initiate upload
    }

    // function applyStarClass(event, classname)
    // {
    //     let star1 = document.querySelector('.Star1');
    //     let star2 = document.querySelector('.Star2');
    //     let star3 = document.querySelector('.Star3');
    //     let star4 = document.querySelector('.Star4');
    //     let star5 = document.querySelector('.Star5');

    //     if (event.target.classList.contains('Star1'))
    //     {
    //         star1.classList.add(classname);
    //         star2.classList.remove(classname);
    //         star3.classList.remove(classname);
    //         star4.classList.remove(classname);
    //         star5.classList.remove(classname);
    //         console.log('star 1');
    //     }
    //     else if (event.target.classList.contains('Star2'))
    //     {
    //         star1.classList.add(classname);
    //         star2.classList.add(classname);
    //         star3.classList.remove(classname);
    //         star4.classList.remove(classname);
    //         star5.classList.remove(classname);
    //         console.log('star 2');
    //     }
    //     else if (event.target.classList.contains('Star3'))
    //     {
    //         star1.classList.add(classname);
    //         star2.classList.add(classname);
    //         star3.classList.add(classname);
    //         star4.classList.remove(classname);
    //         star5.classList.remove(classname);
    //         console.log('star 3');
    //     }
    //     else if (event.target.classList.contains('Star4'))
    //     {
    //         star1.classList.add(classname);
    //         star2.classList.add(classname);
    //         star3.classList.add(classname);
    //         star4.classList.add(classname);
    //         star5.classList.remove(classname);
    //         console.log('star 4');
    //     }
    //     else if (event.target.classList.contains('Star5'))
    //     {
    //         star1.classList.add(classname);
    //         star2.classList.add(classname);
    //         star3.classList.add(classname);
    //         star4.classList.add(classname);
    //         star5.classList.add(classname);
    //         console.log('star 5');
    //     }
    // }

    // function mouseEnterStar(event) {
    //     applyStarClass(event, 'HighlightStar');
    // }

    // function mouseLeaveStar(event) {
    //     document.querySelector('.Star1').classList.remove('HighlightStar');
    //     document.querySelector('.Star2').classList.remove('HighlightStar');
    //     document.querySelector('.Star3').classList.remove('HighlightStar');
    //     document.querySelector('.Star4').classList.remove('HighlightStar');
    //     document.querySelector('.Star5').classList.remove('HighlightStar');
    // }

    // function clickStar(event) {
    //     // event.stopPropagation();
    //     applyStarClass(event, 'SelectStar');
    // }

    function handleStarClick(event)
    {
        event.stopPropagation();

        // fetch request to update rating
    }

  return (
    <div className ={`Card ${hoverable}`} onClick={clickCard}>
        <div className="Center">
            <div className="CardContainer">
                <div className="ImageContainer">
                    <img className="Image" src={imageURL} alt='none'/>
                </div>
                <div className="TitleContainer">
                    <div className="LeftContainer">
                        <div className="ProfileContainer">
                            <div className="ProfilePictureContainer">
                                <img className="ProfilePicture" src="" alt='none'/>
                            </div>
                            <div className="ProfileName">@{props.user.username}</div>
                        </div>
                        <div className="Title">{props.recipe.title}</div>
                    </div>
                    <div className="RightContainer">
                        <div className="StarContainer">
                            {/* <svg className="Star1" onMouseEnter={mouseEnterStar} onMouseLeave={mouseLeaveStar} onClick={clickStar} width="24" height="24" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.825 22L7.45 14.975L2 10.25L9.2 9.625L12 3L14.8 9.625L22 10.25L16.55 14.975L18.175 22L12 18.275L5.825 22Z" fill="black" />
                            </svg>
                            <svg className="Star2" onMouseEnter={mouseEnterStar} onMouseLeave={mouseLeaveStar} onClick={clickStar} width="24" height="24" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.825 22L7.45 14.975L2 10.25L9.2 9.625L12 3L14.8 9.625L22 10.25L16.55 14.975L18.175 22L12 18.275L5.825 22Z" fill="black" />
                            </svg>
                            <svg className="Star3" onMouseEnter={mouseEnterStar} onMouseLeave={mouseLeaveStar} onClick={clickStar} width="24" height="24" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.825 22L7.45 14.975L2 10.25L9.2 9.625L12 3L14.8 9.625L22 10.25L16.55 14.975L18.175 22L12 18.275L5.825 22Z" fill="black" />
                            </svg>
                            <svg className="Star4" onMouseEnter={mouseEnterStar} onMouseLeave={mouseLeaveStar} onClick={clickStar} width="24" height="24" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.825 22L7.45 14.975L2 10.25L9.2 9.625L12 3L14.8 9.625L22 10.25L16.55 14.975L18.175 22L12 18.275L5.825 22Z" fill="black" />
                            </svg>
                            <svg className="Star5" onMouseEnter={mouseEnterStar} onMouseLeave={mouseLeaveStar} onClick={clickStar} width="24" height="24" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.825 22L7.45 14.975L2 10.25L9.2 9.625L12 3L14.8 9.625L22 10.25L16.55 14.975L18.175 22L12 18.275L5.825 22Z" fill="black" />
                            </svg> */}
                            <Rating
                                name="simple-controlled"
                                value={value}
                                onChange={(event, newValue) => {
                                setValue(newValue);
                                }}

                                onClick={handleStarClick}
                            />
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
                            {/* <div className="Tag Yellow">#{props.recipe.tags}</div>
                            <div className="Tag Blue">#{props.recipe.tags}</div> */}
                            {
                                tags.map(tag => {
                                    return (<div className='Tag Teal'>
                                        #{tag}
                                    </div>)
                                })
                            }
                        </div>
                        <div className="ShareContainer">
                            <svg className="Icon" onClick={FollowClicked} width="30" height="30" viewBox="0 0 43 43" fill="black" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.5135 21.5C16.4385 21.5 15.5427 21.0968 14.826 20.2906C14.1093 19.4843 13.8257 18.5437 13.975 17.4687L14.5573 13.0791C14.7961 11.377 15.5725 9.96581 16.8864 8.84542C18.2003 7.72503 19.7382 7.16543 21.5 7.16663C23.2618 7.16663 24.7996 7.72682 26.1135 8.84721C27.4274 9.9676 28.2038 11.3782 28.4427 13.0791L29.025 17.4687C29.1743 18.5437 28.8906 19.4843 28.1739 20.2906C27.4573 21.0968 26.5614 21.5 25.4864 21.5H17.5135ZM17.5135 17.9166H25.4864L24.9041 13.6166C24.7847 12.7805 24.4042 12.0937 23.7628 11.5562C23.1214 11.0187 22.3671 10.75 21.5 10.75C20.634 10.75 19.8797 11.0187 19.2371 11.5562C18.5945 12.0937 18.214 12.7805 18.0958 13.6166L17.5135 17.9166ZM7.16663 35.8333V30.8166C7.16663 29.8014 7.42821 28.8679 7.95138 28.0163C8.47454 27.1646 9.16851 26.5154 10.0333 26.0687C11.8847 25.143 13.7659 24.4484 15.677 23.985C17.5882 23.5216 19.5291 23.2904 21.5 23.2916C23.4708 23.2916 25.4118 23.5233 27.3229 23.9868C29.234 24.4502 31.1152 25.1442 32.9666 26.0687C33.8326 26.5166 34.5272 27.1664 35.0503 28.018C35.5735 28.8697 35.8345 29.8025 35.8333 30.8166V35.8333H7.16663ZM10.75 32.25H32.25V30.8166C32.25 30.4882 32.1675 30.1895 32.0027 29.9208C31.8379 29.652 31.6217 29.443 31.3541 29.2937C29.7416 28.4875 28.1142 27.8831 26.4718 27.4805C24.8295 27.078 23.1722 26.8762 21.5 26.875C19.8277 26.875 18.1704 27.0768 16.5281 27.4805C14.8857 27.8843 13.2583 28.4887 11.6458 29.2937C11.377 29.443 11.1603 29.652 10.9954 29.9208C10.8306 30.1895 10.7488 30.4882 10.75 30.8166V32.25Z" fill="black" />
                            </svg>
                            <svg className="Icon" onClick={CookbookClicked} width="30" height="30" viewBox="0 0 49 49" fill="black" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.25 44.9167C11.127 44.9167 10.1654 44.5165 9.36509 43.7162C8.56475 42.9159 8.16527 41.9549 8.16663 40.8334V8.16671C8.16663 7.04379 8.5668 6.08217 9.36713 5.28184C10.1675 4.4815 11.1284 4.08202 12.25 4.08338H36.75C37.8729 4.08338 38.8345 4.48354 39.6348 5.28388C40.4352 6.08421 40.8347 7.04516 40.8333 8.16671V40.8334C40.8333 41.9563 40.4331 42.9179 39.6328 43.7183C38.8325 44.5186 37.8715 44.9181 36.75 44.9167H12.25ZM12.25 40.8334H36.75V8.16671H32.6666V20.6719C32.6666 21.0803 32.4965 21.3783 32.1562 21.5662C31.8159 21.754 31.4757 21.7452 31.1354 21.5396L27.5625 19.3959L23.9895 21.5396C23.6493 21.7438 23.309 21.7526 22.9687 21.5662C22.6284 21.3797 22.4583 21.0816 22.4583 20.6719V8.16671H12.25V40.8334Z" fill="black" />
                            </svg>
                            <svg className="Icon" onClick={UploadClicked} width="30" height="30" viewBox="0 0 49 49" fill="black" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.25 46.9583C11.127 46.9583 10.1654 46.5581 9.36509 45.7578C8.56475 44.9575 8.16527 43.9965 8.16663 42.875V20.4166C8.16663 19.2937 8.5668 18.3321 9.36713 17.5318C10.1675 16.7314 11.1284 16.3319 12.25 16.3333H18.375V20.4166H12.25V42.875H36.75V20.4166H30.625V16.3333H36.75C37.8729 16.3333 38.8345 16.7335 39.6348 17.5338C40.4352 18.3341 40.8347 19.2951 40.8333 20.4166V42.875C40.8333 43.9979 40.4331 44.9595 39.6328 45.7598C38.8325 46.5602 37.8715 46.9597 36.75 46.9583H12.25ZM22.4583 32.6666V9.851L19.1916 13.1177L16.3333 10.2083L24.5 2.04163L32.6666 10.2083L29.8083 13.1177L26.5416 9.851V32.6666H22.4583Z" fill="black" />
                            </svg>
                            <svg className="Icon" onClick={ShareClicked} width="30" height="30" viewBox="0 0 49 49" fill="black" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.125 40.8333V8.16663L44.9167 24.5M10.2083 34.7083L34.4021 24.5L10.2083 14.2916V21.4375L22.4583 24.5L10.2083 27.5625M10.2083 34.7083V14.2916V27.5625V34.7083Z" fill="black" />
                            </svg>
                        </div>
                    </div>
                    <div className="IngredientsContainer">
                        {/* <div>• 2 cup Flour</div>
                        <div>• 1 tbsp Baking Powder</div>
                        <div>• 1 cup Sugar</div>
                        <div>• 2 tsp Salt</div>
                        <div>• 2 Eggs</div>
                        <div>• 1/2 cup Milk</div>
                        <div>• 1/2 cup Butter</div> */}
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