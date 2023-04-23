import {React, useState, useEffect} from 'react'
import Card from '../../components/Card/Card'
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import './CardContainer.scss';
import ExtendedCard from '../ExtendedCard/ExtendedCard';


import useRefresh from '../../hooks/refreshHook'
import { useSearchParams } from 'react-router-dom';


// takes in a list of recipes insided of props.recipes
// each recipe should be in json format
function CardContainer(props) {
    const [refresh,forceRefresh] = useRefresh()
    const [cards, setCards] = useState([]);
    const [extendedCard, setExtendedCard] = useState();
    const [toastValue, setToastValue] = useState();
    const [show, setShow] = useState(false); // for toast
    const [modalShow, setModalShow] = useState(false); // for modal
    const [searchParams,setSearchParams] = useSearchParams();


    function setToastContent(content)
    {
      setToastValue(content);
      setShow(true);
    }

    // create cards based on props.recipes
    useEffect(() => {
        async function createCards() {
            let found = false
            const cards = []
            for (const recipe of props.recipes)
            {
                let response = await fetch(`http://localhost:3001/api/profiles/${recipe.userid}`, {
                    method: 'GET',
                    credentials: 'include'
                    })
                const user = await response.json()
                cards.push(<Card refresh={refresh} forceRefresh={props.forceRefresh} setToastContent={setToastContent} recipe={recipe} user={user} setExtendedCard={setExtendedCard} setModalShow={setModalShow}/>)
            
                if (parseInt(recipe.id) === parseInt(props.opencard)) {
                    const ingredient_string = recipe.ingredients;
                    let ingredient_arr = []
                    if (ingredient_string)
                    {
                        let arr = ingredient_string.split(':');

                        // only display the first 7 ingredients in the card view
                        if (arr.length > 7)
                        {
                            arr = arr.slice(0, 7);
                            arr.push('...');
                        }
                        
                        ingredient_arr = arr
                    }

                    const tag_string = recipe.tags;
                    let tags = []
                    if (tag_string)
                    {
                        tags = tag_string.split(':');
                    }
        
                    setExtendedCard(<ExtendedCard setExtendedCard={setExtendedCard} user={user} recipe={recipe} imageURL={'http://localhost:3001/static/' + recipe.image} ingredients={ingredient_arr} tags={tags} />)
                    setModalShow(true);
                    searchParams.delete('recipeid')
                    setSearchParams(searchParams)
                }
            }
            setCards(cards)
            //
            //const cardid = props.opencard
        }
        createCards();
    }, [props.recipes,refresh])

    useEffect(()=> {
        window.addEventListener('mousewheel', scrollHandler, {passive:false})

        return () => {
            window.removeEventListener('mousewheel', scrollHandler, {passive:false})
        }
    })

    const scrollHandler = (e) => {
        if (!modalShow) return;

        const card = document.getElementById("ExtendedCard")

        const current = card.style.top
        const height = card.clientHeight

        const screenheight = window.innerHeight

        let currentVal = 0
        if (current !== "") {
            currentVal = parseInt(current.slice(0,current.length-2))
        }

        
        currentVal -= e.deltaY/5
        
        if (currentVal > 0) currentVal = 0
        else if (currentVal < screenheight-height) currentVal = screenheight-height
        
       
        document.getElementById("ExtendedCard").style.top = currentVal + "px"



        e.preventDefault()
    }

    function handleClickOutsideModal() {
        forceRefresh()
        setModalShow(false)
    }

  return (
    <div className={modalShow? 'CardContainer NoScroll' : 'CardContainer'}>
        <ToastContainer className='p-3 position-fixed' position='bottom-start'>
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
            <Toast.Body>{toastValue}</Toast.Body>
        </Toast>
        </ToastContainer>
        <div className="flex">
            {cards}
        </div>

        {modalShow && 
        <div className="ModalContainer" onClick={handleClickOutsideModal} >
            {extendedCard}
        </div>}
    </div>
  )
}

export default CardContainer