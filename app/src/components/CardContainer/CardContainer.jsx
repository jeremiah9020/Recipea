import {React, useState, useEffect} from 'react'
import Card from '../../components/Card/Card'
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Modal from 'react-bootstrap/Modal'
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
                console.log(recipe);
            }
            setCards(cards)
        }
        createCards();
    }, [props.recipes])

    function handleHide() {
        setModalShow(false);
    }

  return (
    <div className='CardContainer'>
        <ToastContainer className='p-3 position-fixed' position='bottom-start'>
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
            <Toast.Body>{toastValue}</Toast.Body>
        </Toast>
        </ToastContainer>
        <div className="flex">
            {cards}
        </div>
        <Modal show={modalShow} onHide={handleHide}>
        {extendedCard}
        </Modal>
    </div>
  )
}

export default CardContainer