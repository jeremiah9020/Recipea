import {React, useState, useEffect} from 'react';
import Helmet from 'react-helmet'
import Header from '../../components/Header/Header'
import Card from '../../components/Card/Card'
import ExtendedCard from '../../components/ExtendedCard/ExtendedCard';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import './Home.scss';

function Home() {
  const [cards, setCards] = useState([]);
  const [extendedCard, setExtendedCard] = useState();
  const [toastValue, setToastValue] = useState();
  const [show, setShow] = useState(false); // for toast

  function setToastContent(content)
  {
    setToastValue(content);
    setShow(true);
  }

  useEffect(() => {
    async function getCards() {
      let response = await fetch('http://localhost:3001/api/recipes', {
        method: 'GET',
        credentials: 'include'
      })
      const recipes = await response.json()

      const cards = []
      for (let recipe of recipes) {
        response = await fetch(`http://localhost:3001/api/profiles/${recipe.userid}`, {
          method: 'GET',
          credentials: 'include'
          })
        const user = await response.json()
        cards.push(<Card setToastContent={setToastContent} recipe={recipe} user={user} setExtendedCard={setExtendedCard}/>)
      }

      setCards(cards)
    }
    getCards()
  }, [])

  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Recipea</title>
        <meta name="description" content="Recipea Web Application" />
      </Helmet>
      <Header/>
      <ToastContainer className='p-3 position-fixed' position='bottom-start'>
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
            <Toast.Body>{toastValue}</Toast.Body>
        </Toast>
      </ToastContainer>
      <div className="flex">
        {cards}
      </div>
      {extendedCard}
    </div>
  )
}

export default Home;