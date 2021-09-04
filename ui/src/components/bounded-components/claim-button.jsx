import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button, Spinner } from '@chakra-ui/react';

import UserAchievement from '../../domain/UserAchievement';
import { claimUserAchievement, unclaimAchievement } from '../../api/api-conn';

const ClaimAchievementButton = (props) => {
  const { user, getAccessTokenSilently } = useAuth0();
  const UserAchievements = props.userAchievements;
  const [ButtonState, setButtonState] = useState();

  useEffect(() => {
    async function determineAchievementState() {
      try {
        if (UserAchievements !== typeof array) {
          const number = UserAchievements.find(
            (x) => x.gameAchievementID === props.achievement.id,
          );
          if (number !== undefined) {
            setButtonState(true);
          } else {
            setButtonState(false);
          }
        }
      } catch (e) {}
    }

    determineAchievementState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ButtonState, UserAchievements]);

  const handleClaimAchievement = (postResponse) => {
    if (postResponse === 0) {
      console.log('this should be firing.');
      setButtonState(true);
    }
    const NewUserAchievements = [...UserAchievements, postResponse];
    props.passAchievements(() => NewUserAchievements);
  };

  const handleUnclaimAchievement = (postResponse) => {
    if (postResponse === 0) {
      setButtonState(false);
    }
    if (UserAchievements.length !== 0) {
      const NewUserAchievements = UserAchievements.filter(
        (achievement) => achievement.gameAchievementID !== props.achievement.id,
      );
      props.passAchievements(() => NewUserAchievements);
    }
  };

  const loadingButton = (
    <Spinner
      thickness='4px'
      speed='0.65s'
      emptyColor='gray.200'
      color='blue.500'
      size='xl'
    />
  );

  const displayUnclaimAchievementButton = (
    <Button
      flex={1}
      fontSize={'sm'}
      rounded={'full'}
      bg={'red.400'}
      color={'white'}
      boxShadow={
        '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
      }
      _hover={{
        bg: 'red.700',
      }}
      _focus={{
        bg: 'red.300',
      }}
      onClick={() => {
        UnclaimAchievement(props.achievement, props.game);
      }}
    >
      Unclaim Achievement
    </Button>
  );

  const displayClaimAchievementButton = (
    <Button
      flex={1}
      fontSize={'sm'}
      rounded={'full'}
      bg={'green.400'}
      color={'white'}
      boxShadow={
        '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
      }
      _hover={{
        bg: 'blue.500',
      }}
      _focus={{
        bg: 'blue.500',
      }}
      onClick={() => {
        claimAchievement(props.achievement, props.game);
      }}
    >
      Claim Achievement
    </Button>
  );

  const claimAchievement = async (achievement, game) => {
    setButtonState(null);
    const Token = await getAccessTokenSilently({
      scope: 'read:current_user',
    });

    const UserPackage = new UserAchievement(game, achievement.id, user.email);

    const postResponse = await claimUserAchievement(UserPackage, Token);
    console.log(postResponse);

    handleClaimAchievement(postResponse);
  };

  const UnclaimAchievement = async (achievement, game) => {
    setButtonState(null);
    const Token = await getAccessTokenSilently({
      scope: 'read:current_user',
    });
    const UserPackage = new UserAchievement(game, achievement.id, user.email);

    const postResponse = await unclaimAchievement(UserPackage, Token);
    // eslint-disable-next-line no-unused-vars
    console.log('posted response is: ', postResponse);
    handleUnclaimAchievement(postResponse);
  };

  switch (ButtonState) {
    case false:
      return displayClaimAchievementButton;
    case true:
      return displayUnclaimAchievementButton;
    default:
      return loadingButton;
  }

  // return (
  //   <>
  //     {ButtonState === false ? (
  //       <> {displayClaimAchievementButton}</>
  //     ) : (
  //       <> {displayUnclaimAchievementButton}</>
  //     )}
  //   </>
  // );
};

export default ClaimAchievementButton;
