import Helmet from 'react-helmet'
import Header from '../../components/Header/Header'
import TestAPIConsumer from '../../components/TestAPIConsumer/TestAPIConsumer'
import Card from '../../components/Card/Card'

function Home() {
  const recipe = {
    'title': 'Yummy Flapjacks',
    'time': '00:25:00',
    'tags':'glutenfree:breakfast',
    'ingredients':'2 cup Flour:1 tbsp Baking Powder:1 cup Sugar:2 tsp Salt:2 Eggs:1/2 cup Milk:1/2 cup Butter',
    'image':null,
  }
  const user = {
    'username': 'MasterChef',
    'profilepicture': null,
  }
  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Recipea</title>
        <meta name="description" content="Recipea Web Application" />
      </Helmet>
      <Header></Header>
      <Card recipe={recipe} user={user} />
      <TestAPIConsumer></TestAPIConsumer>
    </div>
  )
}

export default Home;