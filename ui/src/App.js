import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import GameStub from './components/game-stub';
import Landing from './components/landing';
import Profile from './components/profile';
import { useAuth0 } from '@auth0/auth0-react';
import NavBarRoute from './components/navbar/nav-bar';

const NavBar = styled.div`
  display: flex;
  background-color: white;
  color: black;
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

  const LogoutButton = () => {
    const { logout } = useAuth0();
    return (
      <button onClick={() => logout({ returnTo: window.location.origin })}>
        Log Out
      </button>
    );
  };

  return (
    <>
      <NavBar>
        <Title>Achieveland</Title>
        <NavBarRoute />
      </NavBar>

      <Router>
        <Route path='/' component={Landing} exact />
        <Route path='/game/:id' component={GameStub} />
        <Route exact path='/profile' component={Profile} />
      </Router>
    </>
  );
}

export default App;
