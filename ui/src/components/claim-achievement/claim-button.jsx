import React, { useState, useEffect } from 'react';
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
  });

  const handleClaimAchievement = (postResponse) => {
    props.passAchievements(() => [...UserAchievements, postResponse]);
    setButtonState(true);
  };

  const handleUnclaimAchievement = (postResponse) => {
    console.log('1 user achievements', UserAchievements);
    console.log(props.achievement);
    console.log(
      'achievement id attempting to be moreved is: ',
      props.achievement.id,
    );
    if (UserAchievements.length !== 0) {
      console.log('2 userachievements', UserAchievements);
      const NewUserAchievements = UserAchievements.filter(
        (achievement) => achievement.gameAchievementID !== props.achievement.id,
      );
      console.log('newUserAchievments is: ', NewUserAchievements);
      // const NewUserAchievements = [];
      props.passAchievements(() => NewUserAchievements);
      // console.log('the new props is:', NewProps);
      // props.passAchievements(() => {});
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
    console.log(achievement.id);
    const postResponse = await submitAchievement(
      game,
      achievement.id,
      user.email,
      Token,
    );
    console.log('the posted response is: ', postResponse);
    const PostedAchievement = postResponse.ops[0];
    handleClaimAchievement(PostedAchievement);
  };

  const UnclaimAchievement = async (achievement, game) => {
    const Token = await getAccessTokenSilently({
      scope: 'read:current_user',
    });
    const postResponse = unclaimAchievement(
      game,
      achievement,
      user.email,
      Token,
    );
    handleUnclaimAchievement(postResponse);
  };

  console.log(ButtonState);

  return (
    <>
      {ButtonState === false ? (
        <> {displayClaimAchievementButton}</>
      ) : (
        <> {displayUnclaimAchievementButton}</>
      )}
    </>
  );
  // }
  // else {
  //   return (
  //     <> displaying button failed to load.{displayClaimAchievementButton}</>
  //   );
  // }
  // }
};

export default ClaimAchievementButton;
