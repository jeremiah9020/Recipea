import {React, useState, useEffect} from 'react';
import Helmet from 'react-helmet'
import Header from '../../components/Header/Header'
import CardContainer from '../../components/CardContainer/CardContainer';
import './Home.scss';

function Home() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function populateCardContainer() {
      // get the recipes we want to include in the container (all of them in this case)
      let response = await fetch('http://localhost:3001/api/recipes', {
        method: 'GET',
        credentials: 'include'
      })
      const recipes = await response.json()

      // set the recipes prop of the container and that's it
      setRecipes(recipes);
    }
    populateCardContainer()
  }, [])

  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Recipea</title>
        <meta name="description" content="Recipea Web Application" />
      </Helmet>
      <Header/>
      <CardContainer recipes={recipes} />
    </div>
  )
}

export default Home;