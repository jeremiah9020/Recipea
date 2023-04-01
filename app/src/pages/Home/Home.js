import React, { useState } from 'react';
import Helmet from 'react-helmet'
import Header from '../../components/Header/Header'
import TestAPIConsumer from '../../components/TestAPIConsumer/TestAPIConsumer'

function Home() {
  const [token,setToken] = useState("")
  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Recipea</title>
        <meta name="description" content="Recipea Web Application" />
      </Helmet>
      <Header token={token} setToken={setToken}></Header>
      <TestAPIConsumer token={token}></TestAPIConsumer>
    </div>
  )
}

export default Home;