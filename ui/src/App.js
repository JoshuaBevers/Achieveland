import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import GameStub from './components/game-stub';
import Landing from './components/landing';
import Profile from './components/profile';
import About from './components/about';
import NavBarRoute from './components/navbar/nav-bar';
import GamesList from './components/game-list';
import GameNotFound from './components/game-not-found';
import Mailer from './components/mailer';

const Pad = styled.div`
  padding-top: 10vh;
`;

//pulled to test how I feel about reactstrap
// const NavBar = styled.div`
//   display: flex;
//   background-color: black;

//   color: white;
//   height: 30px;
//   justify-content: space-between;
// `;

// const Title = styled.div`
//   font-size: 20px;
//   height: 14px;
//   background-color: black;
//   color: white;
// `;

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
        <Route path='/submit-game' component={Mailer} exact />
      </Router>
    </>
  );
}

export default App;
