import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { submitAchievement, unclaimAchievement } from '../../util/api-conn';
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
  const [UserAchievements] = useState(props.userAchievements);

  const claimAchievement = async (achievement, game) => {
    const Token = await getAccessTokenSilently({
      scope: 'read:current_user',
    });

    submitAchievement(game, achievement, user.email, Token);
  };

  const UnClaimAchievement = async (achievement, game) => {
    const Token = await getAccessTokenSilently({
      scope: 'read:current_user',
    });

    unclaimAchievement(game, achievement, user.email, Token);
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
    console.log('user props = ', props.userAchievements);
  }, []);
  let display = null;

  if (isAuthenticated === true) {
    //
    console.log('props achievemnt', props.achievement);
    console.log('recieved from database: ', UserAchievements);
    if (UserAchievements !== null) {
      const number = UserAchievements.find(
        (x) => x.game_no === props.achievement.id,
      );
      console.log(number);
      if (number !== undefined) {
        let display = (
          <Button
            className='ui toggle button'
            aria-pressed='false'
            onClick={() => {
              UnClaimAchievement(props.achievement, props.game);
            }}
          >
            Unclaim Achievement
          </Button>
        );
        return display;
      } else {
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
      }
    }

    //

    //   let display = (
    //     <Button
    //       className='ui toggle button'
    //       aria-pressed='false'
    //       onClick={() => {
    //         claimAchievement(props.achievement, props.game);
    //       }}
    //     >
    //       Claim Achievement
    //     </Button>
    //   );
    //   return display;
    // } else {
    //   return display;
  }
};

export default ClaimAchievementButton;
