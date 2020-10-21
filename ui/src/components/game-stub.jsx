import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getGame, getUserAchievements } from '../util/api-conn';
import { Card } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import ClaimAchievementButton from './claim-achievement/claim-button';

const AppFrame = styled.div`
  font-family: Major Mono Display;
  min-height: 100vh;
  background-color: lightgrey;
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
  display: flex;
  text-align: center;
  font-size: 15px;
  justify-content: center;
  flex-wrap: wrap;
`;

const AchievementCard = styled.div`
  width: 95vw;
  margin-top: 20px;
  border-color: orange;
  border-radius: 10px;
  box-shadow: 10px 10px 8px 10px #888888;
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
  }, [user, isAuthenticated, getAccessTokenSilently]);

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
                  <Card>
                    <Card.Body>
                      <Card.Title>{achiev.name}</Card.Title>
                      <Card.Text>{achiev.description}</Card.Text>
                      {/* render claim button if the user is logged in. */}
                      {UserAchievements && (
                        <>
                          <ClaimAchievementButton
                            game={SelectedGame}
                            achievement={achiev}
                            userAchievements={UserAchievements}
                          />
                        </>
                      )}
                    </Card.Body>
                  </Card>
                </AchievementCard>
              );
            })
          : null}
      </AchievementList>
    </AppFrame>
  );
}

export default GameStub;
