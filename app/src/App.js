
import Header from './components/Header/Header'
import TestAPIConsumer from './components/TestAPIConsumer/TestAPIConsumer'

import './App.css';
import {Helmet} from "react-helmet";

function App() {
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
  );
}

export default App;
