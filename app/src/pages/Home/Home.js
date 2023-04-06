import Helmet from 'react-helmet'
import Header from '../../components/Header/Header'
import TestAPIConsumer from '../../components/TestAPIConsumer/TestAPIConsumer'

function Home() {
  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Recipea</title>
        <meta name="description" content="Recipea Web Application" />
      </Helmet>
      <Header></Header>
      <TestAPIConsumer></TestAPIConsumer>
    </div>
  )
}

export default Home;