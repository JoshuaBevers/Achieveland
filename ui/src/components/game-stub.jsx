import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getGame, getUserAchievements } from '../util/api-conn';
import { useAuth0 } from '@auth0/auth0-react';
import ClaimAchievementButton from './claim-achievement/claim-button';
import LoadingSpinner from '../loading-components/loading-spinner';
import { useHistory } from 'react-router-dom';

const LoadingSpinnerCenter = styled.div`
  display: flex;
  justify-content: center;
  margin-right: 15 vw;
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

const Card = styled.div`
  margin-top: 20px;
  border-color: orange;
  border-radius: 10px;
  box-shadow: 5px 5px 4px 5px #888888;
  /* margin-right: 3vw;
  margin-left: 2vw; */
  width: 70vw;
  margin-left: 15vw;

  @media screen and (max-width: 600px) {
    width: 100vw;
    align-self: center;
    display: flex;
    margin-left: 0;
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

const AchievementDescription = styled.div`
  display: flex;
  font-size: 1.5em;
  margin-left: 5vw;
  margin-bottom: 10px;
  justify-content: space-between;
  @media screen and (max-width: 600px) {
    display: grid;
  }
`;

function GameStub() {
  const history = useHistory();

  const [SelectedGame, setSelectedGame] = useState('');
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [UserAchievements, setUserAchievements] = useState('');

  const decodeURL = () => {
    // retrieve the current url
    let url = window.location.href;
    const uriLength = url.length;
    // handle questionmark at end of URI
    if (url.charAt(uriLength - 1) === '?') {
      url = url.slice(0, uriLength - 1);
    }
    const urlParam = url.split('/');
    const uncleanGame = urlParam.pop();
    let GameTitle = uncleanGame;
    //handle multiple words in game title.
    if (uncleanGame.includes('%20')) {
      let splitGame = uncleanGame.split('%20');
      if (splitGame.length >= 2) {
        splitGame = splitGame.map((word) => {
          return word.charAt(0).toLocaleUpperCase() + word.slice(1);
        });
        GameTitle = splitGame.join(' ');
      }
      return GameTitle;
    } else {
      //capitalize first letter in potentially uncapitalized search
      GameTitle = GameTitle.charAt(0).toLocaleUpperCase() + GameTitle.slice(1);
    }
    return GameTitle;
  };

  useEffect(() => {
    async function fetchGame(gameName) {
      const game = await getGame(gameName);

      //handle if fetch didn't find a game
      if (game.length === 0 || game === undefined) {
        history.push('/gamenotfound');
      } else {
        //this avoids async actions taking place during reroute.
        setSelectedGame(game[0]);

        await CurrentUserGameAchievements(game[0]);
        return game;
      }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <AppFrame>
      <Title>
        {SelectedGame !== '' ? (
          <>
            {SelectedGame.name}
            {/* Hard coding total games and player achieved games for the present. Fix below/ */}
          </>
        ) : (
          <p>Loading game...</p>
        )}
      </Title>

      {SelectedGame !== ''
        ? SelectedGame.achievements.map((achiev) => {
            return (
              <Card key={achiev.name}>
                <CardBody>
                  <CardTitle> {achiev.name}</CardTitle>
                  <CardSubtitle>
                    Contributor: {achiev.contributor} &nbsp; &nbsp; &nbsp;
                    &nbsp; &nbsp; Difficulty: {achiev.difficulty}
                  </CardSubtitle>
                  <AchievementDescription>
                    {achiev.description}
                    {/* render claim button if the user is logged in. */}
                    {UserAchievements !== '' ? (
                      <>
                        {isAuthenticated && (
                          <ClaimAchievementButton
                            game={SelectedGame.id}
                            achievement={achiev}
                            userAchievements={UserAchievements}
                            passAchievements={setUserAchievements}
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
