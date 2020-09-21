import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getGame } from '../util/api-conn';
import { Card } from 'react-bootstrap';
import ClaimAchievementButton from './claim-achievement/claim-button';

const AppFrame = styled.div`
  font-family: Major Mono Display;
  min-height: 100vh;
  background-color: lightgrey;
`;

const Title = styled.div`
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
      console.log(
        'About to send: ',
        game,
        ' to verify current games out of achievements.',
      );
      await CurrentUserGameAchievements(game[0]);
      return game;
    }

    async function CurrentUserGameAchievements(currentGame) {
      //setting workable data.
      console.log('receieved game is: ', currentGame);

      //parse workable data.
    }

    const gameIS = decodeURL();
    fetchGame(gameIS);

    //game setting
  }, []);

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
                      {/* render claim button */}

                      <ClaimAchievementButton
                        game={SelectedGame}
                        achievement={achiev}
                      />
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
