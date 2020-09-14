import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import GameStub from './components/game-stub';
import Landing from './components/landing';

const NavBar = styled.div`
  display: flex;
  background-color: black;
  color: white;
  height: 30px;
  justify-content: space-between;
`;

const Button = styled.button`
  width: 100px;
  background-color: orange;
  border-color: orange;
`;

const Title = styled.div`
  font-size: 20px;
`;

function App() {
  const [IsLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <NavBar>
        <Title>Achieveland</Title>
      </NavBar>

      <Router>
        <Route path='/' component={Landing} exact />
        <Route path='/game/:id' component={GameStub} />
      </Router>
    </>
  );
}

export default App;
