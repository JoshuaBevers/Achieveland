import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import UserAchievement from '../../domain/UserAchievement';
import { claimUserAchievement, unclaimAchievement } from '../../api/api-conn';

const ClaimAchievementButton = (props) => {
  const { user, getAccessTokenSilently } = useAuth0();
  const UserAchievements = props.userAchievements;
  const [ButtonState, setButtonState] = useState(false);

  useEffect(() => {
    async function determineAchievementState() {
      if (UserAchievements !== null || UserAchievements !== '') {
        const number = UserAchievements.find(
          (x) => x.gameAchievementID === props.achievement.id,
        );
        if (number !== undefined) {
          setButtonState(true);
        }
      }
    }
    console.log(UserAchievements, typeof UserAchievements);
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
    <button
      className='ui toggle button'
      aria-pressed='false'
      onClick={() => {
        UnclaimAchievement(props.achievement, props.game);
      }}
    >
      Unclaim Achievement
    </button>
  );

  const displayClaimAchievementButton = (
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

  const claimAchievement = async (achievement, game) => {
    const Token = await getAccessTokenSilently({
      scope: 'read:current_user',
    });
    const UserPackage = new UserAchievement(game, achievement.id, user.email);

    const postResponse = await claimUserAchievement(UserPackage, Token);

    handleClaimAchievement(postResponse);
  };

  const UnclaimAchievement = async (achievement, game) => {
    const Token = await getAccessTokenSilently({
      scope: 'read:current_user',
    });
    const UserPackage = new UserAchievement(game, achievement.id, user.email);

    const postResponse = await unclaimAchievement(UserPackage, Token);
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
