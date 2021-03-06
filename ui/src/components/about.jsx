import React, { useState } from 'react';
import styled from 'styled-components';

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
  const [Paren] = useState(`{`);

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
        you can e-mail me at ----e-mail to be determined----
      </p>
      <p>
        If you'd like to contribute to the list of games and achievements,
        follow the JSON below and shoot me an e-mail!
      </p>

      <Divide>----- Form of Sent Data ------</Divide>
      <p>{Paren}</p>
      <p>"name": "Exmaple Game Name",</p>
      <p>"description": "Example Boardgame 1 description",</p>
      <p>"achievements": [</p>
      <p>{Paren}</p>
      <p>"name": "Example Achievement 1",</p>
      <p> "description": "Example 1 Achievement Description",</p>
      <p>"difficulty": "Hard"</p>
      <p>}]},</p>

      <p>{Paren}</p>
      <p>"name": "Exmaple Game 2 Name",</p>
      <p>"description": "Example Boardgame description 2",</p>
      <p>"achievements": [</p>
      <p>{Paren}</p>
      <p>"name": "Example Achievement 2",</p>
      <p> "description": "Example 2 Achievement Description",</p>
      <p>"difficulty": "Easy"</p>
      <p>"Contributor": "Name Here"</p>
      <p> }]},</p>

      <p>Updates to be expected: a form to submit user achievements without direct e-mail. <br />
        update to domain.
        </p>

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
