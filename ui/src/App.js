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
  background-color: black;

  color: white;
  height: 30px;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 20px;
  height: 14px;
  background-color: black;
  color: white;
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
        <Route path='/game/:id' component={GameStub} />
        <Route path='/profile' component={Profile} />
        <Route path='/about' component={About} />
      </Router>
    </>
  );
}

export default App;
