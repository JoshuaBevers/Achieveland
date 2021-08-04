import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import GameStub from './components/pages/game-stub';
import Landing from './components/pages/landing';
import About from './components/pages/about';
import NavBarRoute from './components/navbar/nav-bar';
import GamesList from './components/pages/game-list';
import GameNotFound from './components/pages/game-not-found';
import SubGame from './components/pages/submit-game';

const AppFrame = styled.div`
  font-family: 'Major Mono Display', monospace;
  font-size: 3em;
`;

const Pad = styled.div`
  padding-top: 15vh;
  @media (max-width: 901px) {
    padding: 10vh;
  }
`;

function App() {
  return (
    <AppFrame className='App'>
      <Router>
        <NavBarRoute />
        <Pad />

        <Route path='/' component={Landing} exact />
        <Route path='/game/:id' component={GameStub} />
        <Route path='/about' component={About} />
        <Route path='/gameslist' component={GamesList} exact />
        <Route path='/gamenotfound' component={GameNotFound} exact />
        <Route path='/submit-game' component={SubGame} exact />
      </Router>
    </AppFrame>
  );
}

export default App;
