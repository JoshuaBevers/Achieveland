import React from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';

const AboutPage = styled.div`
  background-color: white;
  font-family: Major Mono Display;
  min-height: 100vh;
`;

const Title = styled.div`
  color: black;
  text-align: center;
  font-size: 40px;
`;

const Divide = styled.div`
  font-size: 25px;
  color: red;
  text-align: center;
`;

const Thanks = styled.div`
  font-size: 25px;
`;

function About() {
  return (
    <AboutPage>
      <Title>About</Title>
      <div>
        Thanks for giving Achieveland a try! Sorry if it is still rough around
        the edges. Data-wise for the scope this is the biggest project I've
        attempted to write from the bottom up! Thank you very much for the
        assumed praises you'll be showering upon me.
      </div>
      <p>
        If you'd like to counter the deluded nature I've constructed for myself,
        you can e-mail me at j.bevers404@gmail.com
      </p>
      <Divide>----------</Divide>

      <Button variant='outline-primary' href='/submit-game'>
        If you'd like to contribute to the list of games and achievements
      </Button>

      <Divide>----------</Divide>

      <Thanks>
        Thank you for your continued support during the development process!
        <br />
        <br />I would love to give out a special thanks to Alexander Higgins,
        where without his support and encouragement this site might still be in
        its beta stage. He has been a mentor, a help, and a true friend. Thank
        you.
      </Thanks>
    </AboutPage>
  );
}

export default About;
