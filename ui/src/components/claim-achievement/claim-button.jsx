import React, { useState } from 'react';
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
  const [UserAchievements] = useState(props.userAchievements);

  const claimAchievement = async (achievement, game) => {
    const Token = await getAccessTokenSilently({
      scope: 'read:current_user',
    });

    submitAchievement(game, achievement.id, user.email, Token);
    // setTimeout(window.location.reload(), 1000);
  };

  const UnClaimAchievement = async (achievement, game) => {
    const Token = await getAccessTokenSilently({
      scope: 'read:current_user',
    });

    unclaimAchievement(game, achievement, user.email, Token);
    // setTimeout(window.location.reload(), 1000);
  };

  if (isAuthenticated === true) {
    if (UserAchievements !== null) {
      console.log('user achievements is not null: ', UserAchievements);
      const number = UserAchievements.find(
        (x) => x.achievement_no === props.achievement.id,
      );
      console.log('the number is: ', number);
      console.log('the achievement id is: ', props.achievement.id);
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
  }
};

export default ClaimAchievementButton;
