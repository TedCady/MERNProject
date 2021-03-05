import './App.css';
import { navigate, Router } from '@reach/router';
import { React, useState } from 'react';
import NascarList from './components/NascarList';
import Info from './views/Info';





function App(props) {
const [getDriver, setDriver] = useState({});


  return (
    <div className="App">

    <Router>
      <NascarList path = "/"/>
      <Info path = '/driver/:id'/>
    </Router>
    
    </div>
  );
}

export default App;
