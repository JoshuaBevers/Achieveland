import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getGame, getUserAchievements } from '../util/api-conn';
import { useAuth0 } from '@auth0/auth0-react';
import ClaimAchievementButton from './claim-achievement/claim-button';
import LoadingSpinner from '../loading-components/loading-spinner';
import UiAchievementCircle from './UIComposit/achievement-progress';

const LoadingSpinnerCenter = styled.div`
  display: flex;
  justify-content: center;
`;

const AppFrame = styled.div`
  font-family: Major Mono Display;
  min-height: 100vh;
`;

const Title = styled.div`
  display: flex;
  text-align: center;
  font-size: 75px;
  -webkit-text-stroke: 0.7px red;
  justify-content: space-evenly;

  @media screen and (max-width: 600px) {
    text-align: center;
    font-size: 75px;
    -webkit-text-stroke: 0.7px red;
  }
`;

const AchievementBorder = styled.p`
  border-bottom: 1px double #000;
`;

const Card = styled.div`
  margin-top: 20px;
  border-color: orange;
  border-radius: 10px;
  box-shadow: 5px 5px 4px 5px #888888;
  margin-right: 3vw;
  width: 70vw;
  @media screen and (max-width: 600px) {
    width: 100vw;
    align-self: center;
    display: flex;
  }
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 600px) {
    display: grid;
  }
`;

const CardTitle = styled.div`
  font-size: 1.7em;
  font-weight: bold;
  margin-left: 2vw;
`;

const CardSubtitle = styled.div`
  color: grey;
  margin-top: -0.5em;
  margin-left: 10vw;
`;

const AchievementDescription = styled.p`
  display: flex;
  font-size: 1.5em;
  margin-left: 5vw;
  justify-content: space-between;
  @media screen and (max-width: 600px) {
    display: grid;
  }
`;

const AchievementDifficulty = styled.p`
  color: grey;
  margin-top: -2em;
`;

function GameStub() {
  const [SelectedGame, setSelectedGame] = useState('');
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [UserAchievements, setUserAchievements] = useState('');
  const [UserProgressCircle, setProgressCount] = useState(0);

  const retrieveGameFromUrlParams = (game) => {
    const url = window.location.href;
    //split the url inserting / between spaces.
    const urlParam = url.split('/');
    //retrieve the game.
    const uncleanGame = urlParam.pop();
    //send that game out for some cleaning!
    const splitGame = game.split('%20');

    let GameTitle = game;
    if (game.includes('%20')) {
      // this is looking to make sure there aren't any spaces in the game name, as those show up as %20 in the url

      if (splitGame.length >= 2) {
        // if there are more than 2 sperate spaces between, join them with a proper sapce.
        GameTitle = splitGame.join(' ');
      }
    }
    return GameTitle;
  };

  const decodeURL = () => {
    // retrieve the current url
    const url = window.location.href;
    //split the url inserting / between spaces.
    const urlParam = url.split('/');
    //retrieve the game.
    const uncleanGame = urlParam.pop();
    //send that game out for some cleaning!
    const CleanGame = retrieveGameFromUrlParams(uncleanGame);

    return CleanGame;
  };

  useEffect(() => {
    async function fetchGame(gameName) {
      const game = await getGame(gameName);
      setSelectedGame(game[0]);

      await CurrentUserGameAchievements(game[0]);
      return game;
    }

    async function CurrentUserGameAchievements(game) {
      //get workable data from database..
      if (isAuthenticated === true) {
        // Auth0 function to get a token to be pass JWT check.
        const Token = await getAccessTokenSilently({
          scope: 'read:current_user',
        });
        if (game.id !== undefined) {
          const userData = await getUserAchievements(
            user.email,
            game.id,
            Token,
          );
          //set workable data

          await setUserAchievements(userData);
        }
      }
    }

    async function LoadData() {
      const gameIS = decodeURL();
      fetchGame(gameIS);
    }

    LoadData();

    //game setting
  }, [user]);

  return (
    <AppFrame>
      <Title>
        {SelectedGame !== '' ? (
          <>
            {SelectedGame.name}
            {/* Hard coding total games and player achieved games for the present. Fix below/ */}
            {isAuthenticated && (
              <UiAchievementCircle
                achievementStatus={UserProgressCircle}
                achievementTotal={SelectedGame.achievements.length}
              />
            )}
          </>
        ) : (
          <p>Loading game...</p>
        )}
      </Title>

      {SelectedGame !== ''
        ? SelectedGame.achievements.map((achiev) => {
            return (
              <Card>
                <CardBody>
                  <CardTitle> {achiev.name}</CardTitle>
                  <CardSubtitle>
                    Contributor: {achiev.contributor} &nbsp; &nbsp; &nbsp;
                    &nbsp; &nbsp; Difficulty: {achiev.difficulty}
                  </CardSubtitle>
                  <AchievementDescription>
                    {achiev.description}{' '}
                    {/* render claim button if the user is logged in. */}
                    {UserAchievements !== '' ? (
                      <>
                        {isAuthenticated && (
                          <ClaimAchievementButton
                            game={SelectedGame.id}
                            achievement={achiev}
                            userAchievements={UserAchievements}
                            passAchievements={setUserAchievements}
                            achievementStatus={UserProgressCircle}
                            incrementAchievementStatus={setProgressCount}
                          />
                        )}
                      </>
                    ) : (
                      <LoadingSpinnerCenter>
                        {isAuthenticated && <LoadingSpinner />}
                      </LoadingSpinnerCenter>
                    )}
                  </AchievementDescription>
                </CardBody>
              </Card>
            );
          })
        : null}
    </AppFrame>
  );
}

export default GameStub;
