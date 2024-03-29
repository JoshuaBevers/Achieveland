import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { getList } from '../api/api-conn';
import { Card } from 'react-bootstrap';
import { Input, InputGroup, InputRightAddon } from '@chakra-ui/react';

const SearchBar = styled.input`
  color: purple;
  width: 700px;
  text-align: center;
  border-radius: 15px;
  margin-top: -25px;
  padding-top: 1px;
  padding-bottom: 1px;
  font-size: 0.6em;

  @media screen and (max-width: 600px) {
    width: 310px;
  }
`;

const CenterArea = styled.div`
  display: flex;
  text-align: center;
  align-content: center;
  align-items: center;
  padding-top: 15vh;
  flex-direction: column;
  font-size: 3.4em;

  @media screen and (max-width: 600px) {
    font-size: 2em;
    margin-top: 0px;
  }
`;

const UnderBar = styled.p`
  font-size: 23px;
  margin-top: 10px;
  -webkit-text-stroke: 0.4px blue;
  @media screen and (max-width: 600px) {
    font-size: 13px;
  }
`;

const InputTitle = styled.p`
  font-size: 40px;
  margin-bottom: 20px;
  margin-top: 40px;
`;

const SearchButton = styled.button`
  background-color: white;
  border-radius: 10px;
  font-size: 17px;
  margin-bottom: 30px;
  margin-top: 10px;

  @media screen and (max-width: 600px) {
    padding-left: 70px;
    padding-right: 70px;
  }
`;

const ResultList = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin-top: 0px;
  margin-bottom: -100px;
`;

const SearchResult = styled.form`
  width: 95vw;
  margin-left: 2vw;
  margin-top: 20px;
  border-radius: 10px;
  box-shadow: 10px 10px 8px 10px #888888;
`;

function Landing() {
  const [UInput, setUInput] = useState('');
  const [GameResults, setGameResults] = useState([]);

  const GenerateGameList = async () => {
    let DatabaseResults = [];
    const SearchResults = await getList(UInput.toLowerCase());
    console.log(SearchResults);
    if (SearchResults !== undefined) {
      //handle for no internet.
      SearchResults.forEach((game) => {
        DatabaseResults.push(game);
      });

      setGameResults(DatabaseResults);
    }
    //should display some sort of error? Chances are users aren't connecting to this screen per chance. Only real use case is in dev.
    console.log('Sorry, it seems you do not have an internet connection');
  };

  const handleSearch = (e) => {
    GenerateGameList();
  };

  const handleSubmit = (e) => {
    if (e.key === 'Enter') {
      GenerateGameList();
    }
  };

  return (
    <div>
      <CenterArea>
        <InputTitle>Find Boardgames</InputTitle>
        <InputGroup size='md' style={{ width: '75%' }}>
          <Input
            placeholder='Achieve'
            value={UInput}
            onChange={(e) => {
              setUInput(e.target.value);
            }}
            onKeyPress={handleSubmit}
          />
          <InputRightAddon children='Search' onClick={handleSearch} />
        </InputGroup>
        <UnderBar>Complete Achievements</UnderBar>
        {/* <SearchButton onClick={handleSearch}>Search</SearchButton> */}
      </CenterArea>
      <ResultList>
        {GameResults.length !== 0
          ? GameResults.map((game) => {
              return (
                <SearchResult key={game.name}>
                  <Card>
                    <Card.Body>
                      <Link to={`/game/${game.name}`}>
                        <Card.Title>{game.name}</Card.Title>
                      </Link>
                      <Card.Text>{game.description}</Card.Text>
                    </Card.Body>
                  </Card>
                </SearchResult>
              );
            })
          : null}
      </ResultList>
    </div>
  );
}

export default Landing;
