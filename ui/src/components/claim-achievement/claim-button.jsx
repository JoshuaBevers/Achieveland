import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { submitAchievement } from '../../util/api-conn';

const ClaimAchievementButton = (props) => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);

  const claimAchievement = (achievement, game) => {
    console.log('achievement is: ', achievement);
    console.log('game is: ', game);
    console.log(user);
    submitAchievement(game, achievement, user.email);
  };

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = process.env.REACT_APP_AUTH0_DOMAIN;

      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://${domain}/api/v2/`,
          scope: 'read:current_user',
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

  let display = (
    <button
      className='ui toggle button'
      aria-pressed='false'
      onClick={() => {
        claimAchievement(props.achievement, props.game);
      }}
    >
      Claim Achievement
    </button>
  );
  return display;
};

export default ClaimAchievementButton;
