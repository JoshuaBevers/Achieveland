import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { submitAchievement } from '../../util/api-conn';
import styled from 'styled-components';

const Button = styled.button`
  background-color: lightseagreen;
  border-radius: 12px;
  font-family: Major Mono Display;
  color: purple;
`;

const ClaimAchievementButton = (props) => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);

  const claimAchievement = async (achievement, game) => {
    const Token = await getAccessTokenSilently({
      scope: 'read:current_user',
    });
    console.log('achievement is: ', achievement);
    console.log('game is: ', game);
    console.log('the user is: ', user);
    submitAchievement(game, achievement, user.email, Token);
  };

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = process.env.REACT_APP_AUTH0_DOMAIN;
      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://${domain}/api/v2/`,
          scope: 'read:users',
        });

        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const { user_metadata } = await metadataResponse.json();

        setUserMetadata(user_metadata);
      } catch (e) {
        console.log(e.message);
      }
    };
    getUserMetadata();
  }, []);
  let display = null;
  if (isAuthenticated === true) {
    let display = (
      <Button
        className='ui toggle button'
        aria-pressed='false'
        onClick={() => {
          claimAchievement(props.achievement, props.game);
        }}
      >
        Claim Achievement
      </Button>
    );
    return display;
  } else {
    return display;
  }
};

export default ClaimAchievementButton;
