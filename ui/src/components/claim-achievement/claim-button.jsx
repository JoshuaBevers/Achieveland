import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { submitAchievement, unclaimAchievement } from '../../util/api-conn';
import styled from 'styled-components';

const ClaimButton = styled.button`
  background-color: transparent;
  border-radius: 12px;
  font-family: Major Mono Display;
  color: blue;
  margin-bottom: 2vh;
  border-color: blue;
`;

const UnclaimButton = styled.button`
  background-color: transparent;
  border-radius: 12px;
  font-family: Major Mono Display;
  color: red;
  margin-bottom: 2vh;
  border-color: red;
`;

const ClaimAchievementButton = (props) => {
  const { user, getAccessTokenSilently } = useAuth0();
  const UserAchievements = props.userAchievements;

  const claimAchievement = async (achievement, game) => {
    const Token = await getAccessTokenSilently({
      scope: 'read:current_user',
    });
    submitAchievement(game, achievement.id, user.email, Token);
    setTimeout(window.location.reload(), 1000);
  };

  const UnClaimAchievement = async (achievement, game) => {
    const Token = await getAccessTokenSilently({
      scope: 'read:current_user',
    });
    unclaimAchievement(game, achievement, user.email, Token);
    setTimeout(window.location.reload(), 1000);
  };

  if (UserAchievements !== null) {
    const number = UserAchievements.find(
      (x) => x.gameAchievementID === props.achievement.id,
    );

    if (number !== undefined) {
      let display = (
        <UnclaimButton
          className='ui toggle button'
          aria-pressed='false'
          onClick={() => {
            UnClaimAchievement(props.achievement, props.game);
          }}
        >
          Unclaim Achievement
        </UnclaimButton>
      );
      return display;
    } else {
      let display = (
        <ClaimButton
          className='ui toggle button'
          aria-pressed='false'
          onClick={() => {
            claimAchievement(props.achievement, props.game);
          }}
        >
          Claim Achievement
        </ClaimButton>
      );
      return display;
    }
  }
};

export default ClaimAchievementButton;
