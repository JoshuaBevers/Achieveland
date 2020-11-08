import React from 'react';
import styled from 'styled-components';

import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from './logout-button';
import LoginButton from './login-button';

const NavBarStyled = styled.div`
  background-color: black;
  color: white;
`;
const AboutLink = styled.button`
  margin-right: 8px;
  background-color: black;
  color: white;
  border-color: white;
`;

const AuthNav = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <NavBarStyled className='justify-content-end'>
      <a href={`/about`}>
        <AboutLink>About</AboutLink>
      </a>
      {isAuthenticated ? <LogoutButton /> : <LoginButton />}
    </NavBarStyled>
  );
};

export default AuthNav;
