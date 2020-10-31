import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import GameStub from './components/game-stub';
import Landing from './components/landing';
import Profile from './components/profile';
import About from './components/about';
import NavBarRoute from './components/navbar/nav-bar';

const NavBar = styled.div`
  display: flex;
  background-color: lightgrey;

  color: black;
  height: 30px;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 20px;
  background-color: lightgrey;
`;

function App() {
  return (
    <>
      <NavBar>
        <a href='/'>
          <Title>Achieveland</Title>
        </a>
        <NavBarRoute />
      </NavBar>

      <Router>
        <Route path='/' component={Landing} exact />
        <Route exact path='/game/:id' component={GameStub} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/about' component={About} />
      </Router>
    </>
  );
}

export default App;
