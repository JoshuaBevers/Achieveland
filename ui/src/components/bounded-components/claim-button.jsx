import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import styled from 'styled-components';
import UserAchievement from '../../domain/UserAchievement';
import UserAchievementDAO from '../../DAO/UserAchievementDAO';
const AchievementDAO = new UserAchievementDAO();

const ClaimButton = styled.button`
  background-color: transparent;
  border-radius: 12px;
  font-family: Major Mono Display;
  color: green;
  border-color: green;
  font-size: 0.7em;
  margin-right: 10vw;
  box-shadow: 3px 4px 3px 3px #0002;
  @media screen and (max-width: 600px) {
    margin-top: 10px;
  }
`;

const UnclaimButton = styled.button`
  background-color: transparent;
  border-radius: 12px;
  font-family: Major Mono Display;
  color: red;
  border-color: red;
  font-size: 0.7em;
  margin-right: 10vw;
  box-shadow: 3px 4px 3px 3px #0002;
  @media screen and (max-width: 600px) {
    margin-top: 10px;
  }
`;

const ClaimAchievementButton = (props) => {
  const { user, getAccessTokenSilently } = useAuth0();
  const UserAchievements = props.userAchievements;
  const [ButtonState, setButtonState] = useState(false);

  useEffect(() => {
    async function determineAchievementState() {
      if (UserAchievements !== null) {
        const number = UserAchievements.find(
          (x) => x.gameAchievementID === props.achievement.id,
        );
        if (number !== undefined) {
          setButtonState(true);
        }
      }
    }
    determineAchievementState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ButtonState]);

  const handleClaimAchievement = (postResponse) => {
    props.passAchievements(() => [...UserAchievements, postResponse]);
    setButtonState(true);
  };

  const handleUnclaimAchievement = () => {
    if (UserAchievements.length !== 0) {
      const NewUserAchievements = UserAchievements.filter(
        (achievement) => achievement.gameAchievementID !== props.achievement.id,
      );
      props.passAchievements(() => NewUserAchievements);
      setButtonState(false);
    }
  };

  const displayUnclaimAchievementButton = (
    <UnclaimButton
      className='ui toggle button'
      aria-pressed='false'
      onClick={() => {
        UnclaimAchievement(props.achievement, props.game);
      }}
    >
      Unclaim Achievement
    </UnclaimButton>
  );

  const displayClaimAchievementButton = (
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

  const claimAchievement = async (achievement, game) => {
    const Token = await getAccessTokenSilently({
      scope: 'read:current_user',
    });
    const UserPackage = new UserAchievement(game, achievement.id, user.email);

    const postResponse = await AchievementDAO.create(UserPackage, Token);

    handleClaimAchievement(postResponse);
  };

  const UnclaimAchievement = async (achievement, game) => {
    const Token = await getAccessTokenSilently({
      scope: 'read:current_user',
    });
    const UserPackage = new UserAchievement(game, achievement.id, user.email);

    const postResponse = await AchievementDAO.delete(UserPackage, Token);
    // eslint-disable-next-line no-unused-vars
    handleUnclaimAchievement();
  };

  return (
    <>
      {ButtonState === false ? (
        <> {displayClaimAchievementButton}</>
      ) : (
        <> {displayUnclaimAchievementButton}</>
      )}
    </>
  );
};

export default ClaimAchievementButton;
