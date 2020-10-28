import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.render(
  <Auth0Provider
    domain={'dev-zrtci-fg.us.auth0.com'}
    clientId={'ps2F5BCxlmqpu7cEs8p0x7jixHH75DYR'}
    redirectUri={window.location.origin}
    audience={'https://43jwmj8nuf.execute-api.us-east-1.amazonaws.com/dev/'}
    scope='read:users'
  >
    <App />
  </Auth0Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
