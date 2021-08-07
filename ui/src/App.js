import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import GameStub from './components/pages/game-stub';
import styled from 'styled-components';
import Landing from './components/pages/landing';
import About from './components/pages/about';
import NavBarRoute from './components/navbar/nav-bar';
import GamesList from './components/pages/game-list';
import GameNotFound from './components/pages/game-not-found';
import SubGame from './components/pages/submit-game';

function App() {
  return (
    <Router>
      <div className='nav-bar' id='navbar'>
        <NavBarRoute />
      </div>
      <div>
        <Route path='/' component={Landing} exact />
        <Route path='/game/:id' component={GameStub} />
        <Route path='/about' component={About} />
        <Route path='/gameslist' component={GamesList} exact />
        <Route path='/gamenotfound' component={GameNotFound} exact />
        <Route path='/submit-game' component={SubGame} exact />
      </div>
    </Router>
  );
}

export default App;
