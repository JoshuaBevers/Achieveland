import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Col, Spinner, Form } from 'react-bootstrap';
import { submitGameAndAchievement } from '../../util/api-conn';
import { useHistory } from 'react-router-dom';

const AchievementFrame = styled.div`
  padding-left: 2vw;
  padding-right: 2vw;
`;

const AchievementForm = styled.p`
  font-size: 1.5em;
`;

export default function SubGame() {
  const history = useHistory();
  const [loader, setLoader] = useState(false);
  const [gameName, setGameName] = useState('');
  const [contributor, setContributor] = useState('');
  const [UserStack, setUserStack] = useState([
    {
      id: 0,
      achievementName: '',
      achievementDifficulty: 'Easy',
      achievementDescription: '',
    },
  ]);

  const handleIncrimentButton = () => {
    setUserStack([
      ...UserStack,
      { id: UserStack.length, achievementDifficulty: 'Easy' },
    ]);
  };

  const handleAchievementName = (newData, arrPos) => {
    const newArr = [...UserStack];
    newArr[arrPos].achievementName = newData;
    setUserStack(newArr);
  };

  const handleDifficulty = (newData, arrPos) => {
    const newArr = [...UserStack];
    newArr[arrPos].achievementDifficulty = newData;
    setUserStack(newArr);
  };

  const handleTextChange = (newData, arrPos) => {
    const newArr = [...UserStack];
    newArr[arrPos].achievementDescription = newData;
    setUserStack(newArr);
  };

  const submitGame = async () => {
    setLoader(true);
    //submits data to lambda to be sent to mongo cluster.
    const packagedUser = { contributor, gameName, UserStack };
    const submitResult = await submitGameAndAchievement(packagedUser);
    //show that the achievement was submitted successfully.
    if (submitResult === 1) {
      history.go(0);
    }
  };

  const formControler = (arrPos) => {
    return (
      <div key={UserStack[arrPos].id}>
        <br />
        <br />
        <AchievementForm>Achievement: {arrPos}</AchievementForm>
        <Form.Row>
          <Col>
            <Form.Label style={{ marginLeft: 10 }}>Achievement Name</Form.Label>
            <Form.Control
              as='textarea'
              placeholder='Be the best batman'
              rows={1}
              onChange={(e) => {
                handleAchievementName(e.target.value, arrPos);
              }}
            />
          </Col>
          <Col>
            <Form.Label style={{ marginLeft: 10 }}>
              Achievement Difficulty
            </Form.Label>
            <Form.Control
              as='select'
              onChange={(e) => {
                handleDifficulty(e.target.value, arrPos);
              }}
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </Form.Control>
          </Col>
        </Form.Row>
        <Form.Group controlId='exampleForm.ControlTextarea2'>
          <Form.Label style={{ marginLeft: 10, marginTop: 10 }}>
            Achievement Description
          </Form.Label>
          <Form.Control
            as='textarea'
            placeholder='Win with finnese and style'
            rows={2}
            onChange={(e) => handleTextChange(e.target.value, arrPos)}
          />
        </Form.Group>
      </div>
    );
  };

  return (
    <AchievementFrame>
      <Form>
        <Form.Row>
          <Col>
            <Form.Label style={{ marginLeft: 10 }}>Game Name</Form.Label>
            <Form.Control
              placeholder='GameName'
              onChange={(e) => setGameName(e.target.value)}
            />
          </Col>
          <Col>
            <Form.Label style={{ marginLeft: 10 }}>Contributor Name</Form.Label>
            <Form.Control
              placeholder='Contributor'
              onChange={(e) => setContributor(e.target.value)}
            />
          </Col>
        </Form.Row>
        {/* render x UserStack of achivement requests */}
        {UserStack.map((e, index) => {
          return formControler(index);
        })}
      </Form>
      <Button
        variant='outline-primary'
        onClick={handleIncrimentButton}
        style={{ marginRight: 20 }}
      >
        Add another Achievement
      </Button>
      {loader === false ? (
        <Button variant='outline-primary' onClick={submitGame}>
          Submit Game
        </Button>
      ) : (
        <Button variant='primary' disabled>
          <Spinner
            as='span'
            animation='grow'
            size='sm'
            role='status'
            aria-hidden='true'
          />
          Loading...
        </Button>
      )}
    </AchievementFrame>
  );
}
