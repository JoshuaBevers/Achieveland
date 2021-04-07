import React, { useEffect, useState } from 'react';
import { getAll, getByLetter } from '../util/api-conn';
import styled from 'styled-components';
import Pagination from 'react-bootstrap/Pagination';
import { Link } from 'react-router-dom';

const GameFrame = styled.div`
  padding-left: 5vw;
  padding-bottom: 4vh;
`;

export default function GamesList() {
  const [GameList, setGameList] = useState('');
  const [activeLetter, setActiveLetter] = useState();

  const PaginationLetter = () => {
    return <Pagination>{itemsLetter}</Pagination>;
  };

  const handleLetterClick = async (number, letter) => {
    //changes toggled number on selection to the number recived.
    setActiveLetter(number);
    //sets the game list with new list based on letter
    const fetchedGames = await getByLetter(letter);
    setGameList(fetchedGames);
  };

  const alpha = Array.from(Array(26)).map((e, i) => i + 65);
  const alphabet = alpha.map((x) => String.fromCharCode(x));

  let itemsLetter = [];

  for (let number = 0; number <= alphabet.length - 1; number++) {
    itemsLetter.push(
      <Pagination.Item
        onClick={() => {
          handleLetterClick(number, alphabet[number]);
        }}
        key={alphabet[number]}
        active={number === activeLetter}
      >
        {alphabet[number]}
      </Pagination.Item>,
    );
  }

  useEffect(() => {
    const getList = async () => {
      const games = await getAll();
      const sortedGames = games.sort();
      await setGameList(sortedGames);
    };
    // func
    getList();
    //
  }, []);

  return (
    <>
      {/* // pagination */}
      <PaginationLetter />
      <br />
      {GameList !== '' ? (
        GameList.map((game, index) => {
          return (
            <GameFrame key={index}>
              <Link to={`/game/${game}`}>{game}</Link>
            </GameFrame>
          );
        })
      ) : (
        <>Loading games.</>
      )}
    </>
  );
}
