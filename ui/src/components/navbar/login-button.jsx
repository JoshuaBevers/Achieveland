import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';

const Button = styled.button`
  background-color: black;
  border-color: white;
  color: white;
`;

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Button
      onClick={() => loginWithRedirect()}
      variant='primary'
      className='btn-margin'
    >
      Log In
    </Button>
  );
};

export default LoginButton;
