import React from 'react';
import styled from 'styled-components';
import { Col, Container, Row, Button } from 'react-bootstrap';

const RennoImage = styled.img`
  height: 25vh;
`;

const Padding = styled.div`
  padding-top: 20vh;
`;

const SetupFrame = styled.div`
  font-weight: bold;
`;

const TitleCard = styled.p`
  font-size: 1.25em;
  padding-left: 13vw;
`;

const UnderCard = styled.p`
  font-size: 1.25em;
`;

export default function GameNotFound() {
  return (
    <SetupFrame>
      <Padding />
      <Container>
        <TitleCard>
          Sorry! The game you are looking for couldn't be found!
        </TitleCard>
        <Row className='justify-content-md-center'>
          <Col xs lg='2'></Col>
          <Col md='auto'></Col>
          <Col xs lg='2'></Col>
        </Row>
        <Row>
          <Col>
            <Button variant='outline-primary' href='/gameslist'>
              Check the Library
            </Button>
          </Col>
          <Col md='auto'>
            <UnderCard>
              Perhaps you can find it in the Library? <br />
              Or submit the game and some achievements!
            </UnderCard>
          </Col>
          <Col xs lg='2'>
            <Button variant='outline-primary' href='/submit-game'>
              Submit your Game
            </Button>
          </Col>
        </Row>
      </Container>
    </SetupFrame>
  );
}
