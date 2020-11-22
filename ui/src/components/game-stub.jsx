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

const AchievementList = styled.div`
  text-align: center;
  font-size: 15px;
  flex-wrap: wrap;
  display: flex;
  justify-content: space-evenly;
  align-items: baseline;
`;

const AchievementCard = styled.div`
  width: 40vw;
  margin-top: 20px;
  border-color: orange;
  border-radius: 10px;
  box-shadow: 5px 5px 4px 5px #888888;
  margin-right: 3vw;
  position: relative;
`;

const AchivementCardTitle = styled.p`
  text-align: center;
  border-bottom: 1px solid #000;
  font-size: 24px;
  font-weight: bold;
`;

const AchievementBorder = styled.p`
  border-bottom: 1px double #000;
`;

const AchievementDescription = styled.p`
  font-size: 20px;
`;

const ClaimAchievementContainer = styled.div`
  position: relative;
`;

const AchievementDifficulty = styled.p`
  text-align: left;
  margin-left: 10px;
`;

function GameStub() {
  const [SelectedGame, setSelectedGame] = useState('');
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [UserAchievements, setUserAchievements] = useState('');

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

  const handleNewQuery = () => {
    console.log('this was clicked');
  };

  useEffect(() => {
    async function fetchGame(gameName) {
      const game = await getGame(gameName);
      setSelectedGame(game[0]);
      console.log('hello, this is fetch game.', game[0]);

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
        console.log(game.id);
        if (game.id !== undefined) {
          const userData = await getUserAchievements(
            user.email,
            game.id,
            Token,
          );
          //set workable data

          await setUserAchievements(userData);
          console.log('the user data is: ', userData);
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
                achievementActual={UserAchievements}
                achievementsCompleted={UserAchievements.length}
                achievementsToBeCompleted={SelectedGame.achievements.length}
              />
            )}
          </>
        ) : (
          <p>Loading game...</p>
        )}
      </Title>
      <AchievementList>
        {SelectedGame !== ''
          ? SelectedGame.achievements.map((achiev) => {
              return (
                <AchievementCard key={achiev.id}>
                  <AchivementCardTitle> {achiev.name}</AchivementCardTitle>
                  <AchievementDescription>
                    {achiev.description}
                  </AchievementDescription>
                  <AchievementDifficulty>
                    Difficulty: {achiev.difficulty}
                  </AchievementDifficulty>

                  <AchievementBorder />
                  {/* render claim button if the user is logged in. */}
                  {UserAchievements !== '' ? (
                    <ClaimAchievementContainer>
                      {isAuthenticated && (
                        <ClaimAchievementButton
                          onClick={handleNewQuery}
                          game={SelectedGame.id}
                          achievement={achiev}
                          userAchievements={UserAchievements}
                        />
                      )}
                    </ClaimAchievementContainer>
                  ) : (
                    <LoadingSpinnerCenter>
                      {isAuthenticated && <LoadingSpinner />}
                    </LoadingSpinnerCenter>
                  )}
                </AchievementCard>
              );
            })
          : null}
      </AchievementList>
    </AppFrame>
  );
}

export default GameStub;
