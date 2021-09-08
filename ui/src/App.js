import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import GameStub from './pages/game-stub';
import Landing from './pages/landing';
import About from './pages/about';
import GamesList from './pages/game-list';
import GameNotFound from './pages/game-not-found';
import SubGame from './pages/submit-game';
import NavBarRoute from './components/navbar/nav-bar';

function App() {
  return (
    <Router>
      <div className='nav-bar' id='navbar'>
        <NavBarRoute />
      </div>
      <div>
        <Route path='/' component={Landing} exact />
        <Route path='/game/:id' component={GameStub} />
        <Route path='/about' component={About} exact />
        <Route path='/gameslist' component={GamesList} exact />
        <Route path='/gamenotfound' component={GameNotFound} exact />
        <Route path='/submit-game' component={SubGame} exact />
      </div>
    </Router>
  );
}

export default App;
