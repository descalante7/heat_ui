import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

//Styles
import './App.css';

//History
import history from './services/history';
import Routes from './routes/router';

function App() { 
  return (
      <Router history={history}>
        <Routes />
      </Router>
  ); 
}

export default App;
