import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import GameStub from './components/game-stub';
import Landing from './components/landing';
import About from './components/about';
import NavBarRoute from './components/navbar/nav-bar';
import GamesList from './components/game-list';
import GameNotFound from './components/game-not-found';
import SubGame from './components/submit-game';

const Pad = styled.div`
  padding-top: 10vh;
`;

function App() {
  return (
    <>
      <Router>
        <NavBarRoute />
        <Pad />

        <Route path='/' component={Landing} exact />
        <Route path='/game/:id' component={GameStub} />
        {/* <Route path='/profile' component={Profile} /> */}
        <Route path='/about' component={About} />
        <Route path='/gameslist' component={GamesList} exact />
        <Route path='/gamenotfound' component={GameNotFound} exact />
        <Route path='/submit-game' component={SubGame} exact />
      </Router>
    </>
  );
}

export default App;
