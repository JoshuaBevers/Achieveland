import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getGame, getUserAchievements } from '../util/api-conn';
import { useAuth0 } from '@auth0/auth0-react';
import ClaimAchievementButton from './claim-achievement/claim-button';
import LoadingSpinner from '../loading-components/loading-spinner';

// import 'antd/dist/antd.css';

const AppFrame = styled.div`
  font-family: Major Mono Display;
  min-height: 100vh;
`;

const Title = styled.div`
  text-align: center;
  font-size: 75px;
  -webkit-text-stroke: 0.7px red;
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

function GameStub() {
  const [SelectedGame, setSelectedGame] = useState('');
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [UserAchievements, setUserAchievements] = useState('');

  const cleanGame = (game) => {
    let GameTitle = game;
    if (game.includes('%20')) {
      const splitGame = game.split('%20');

      if (splitGame.length >= 2) {
        GameTitle = splitGame.join(' ');
      }
    }
    return GameTitle;
  };

  const decodeURL = () => {
    const url = window.location.href;
    const urlParam = url.split('/');
    const uncleanGame = urlParam.pop();
    const CleanGame = cleanGame(uncleanGame);

    return CleanGame;
  };

  useEffect(() => {
    async function fetchGame(gameName) {
      const game = await getGame(gameName);
      setSelectedGame(game[0]);
      console.log('hello, this is fetch game.');

      await CurrentUserGameAchievements(game[0]);
      return game;
    }

    async function CurrentUserGameAchievements(game) {
      //get workable data from database..
      if (isAuthenticated === true) {
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
  }, [user, isAuthenticated]);

  return (
    <AppFrame>
      <Title>
        {SelectedGame !== '' ? (
          <div>{SelectedGame.name}</div>
        ) : (
          <p>Loading...</p>
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
                  <AchievementBorder />
                  {/* render claim button if the user is logged in. */}
                  {UserAchievements !== '' ? (
                    <ClaimAchievementContainer>
                      {isAuthenticated && (
                        <ClaimAchievementButton
                          game={SelectedGame}
                          achievement={achiev}
                          userAchievements={UserAchievements}
                        />
                      )}
                    </ClaimAchievementContainer>
                  ) : (
                    <LoadingSpinner />
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
