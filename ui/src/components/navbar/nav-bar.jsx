import React, { useLayoutEffect, useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from './logout-button';
import LoginButton from './login-button';

function useMediaQuery() {
  const [screenSize, setScreenSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateScreenSize() {
      setScreenSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateScreenSize);
    updateScreenSize();
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  return screenSize;
}

const AuthNav = () => {
  const history = useHistory();
  const [UiInput, setUiInput] = useState('');
  const { isAuthenticated } = useAuth0();
  const [width] = useMediaQuery();

  const handleSubmit = (e) => {
    if (e.key === 'Enter') {
      history.push(`/game/${UiInput}`);
    }
  };

  return (
    <Navbar fixed='top' bg='dark' variant='dark' className='navBar'>
      <Navbar.Brand href='/'>Achieveland</Navbar.Brand>
      <Nav className='mr-auto'>
        <Nav.Link href='/about' style={{ marginLeft: 10 }}>
          About
        </Nav.Link>
        <Nav.Link href='/gameslist'>Game List</Nav.Link>
        {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      </Nav>
      {width > 600 ? (
        <>
          <Form inline>
            <FormControl
              value={UiInput}
              onChange={(e) => {
                setUiInput(e.target.value);
              }}
              type='search'
              placeholder='Game Search'
              className='mr-sm-2'
              onKeyPress={handleSubmit}
            />
            <Link to={`/game/${UiInput}`}>
              <Button variant='outline-info'>Search</Button>
            </Link>
          </Form>
        </>
      ) : (
        <></>
      )}
    </Navbar>
  );
};

export default AuthNav;
