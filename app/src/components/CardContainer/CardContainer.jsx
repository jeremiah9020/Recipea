import {React, useState, useEffect} from 'react'
import Card from '../../components/Card/Card'
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import './CardContainer.scss';

// takes in a list of recipes insided of props.recipes
// each recipe should be in json format
function CardContainer(props) {
    const [cards, setCards] = useState([]);
    const [extendedCard, setExtendedCard] = useState();
    const [toastValue, setToastValue] = useState();
    const [show, setShow] = useState(false); // for toast
    const [modalShow, setModalShow] = useState(false); // for modal

    function setToastContent(content)
    {
      setToastValue(content);
      setShow(true);
    }

    // create cards based on props.recipes
    useEffect(() => {
        async function createCards() {
            const cards = []
            for (const recipe of props.recipes)
            {
                let response = await fetch(`http://localhost:3001/api/profiles/${recipe.userid}`, {
                    method: 'GET',
                    credentials: 'include'
                    })
                const user = await response.json()
                cards.push(<Card setToastContent={setToastContent} recipe={recipe} user={user} setExtendedCard={setExtendedCard} setModalShow={setModalShow}/>)
            }
            setCards(cards)
        }
        createCards();
    }, [props.recipes])

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

        console.log(screenheight)

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
        <div className="ModalContainer" onClick={()=>{setModalShow(false)}} >
            {extendedCard}
        </div>}
    </div>
  )
}

export default CardContainer