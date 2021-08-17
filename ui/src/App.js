import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import GameStub from './pages/game-stub';
import Landing from './pages/landing';
import About from './pages/about';
import GamesList from './pages/game-list';
import GameNotFound from './pages/game-not-found';
import SubGame from './pages/submit-game';
import NavBarRoute from './components/navbar/nav-bar';
import componentQueries from './components/dist/react-component-queries';

import './styles/reduction.scss';

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
const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);
