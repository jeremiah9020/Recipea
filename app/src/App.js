
import Header from './components/Header/Header'
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
    </div>
  );
}

export default App;
