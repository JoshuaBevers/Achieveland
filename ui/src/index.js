import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Auth0Provider } from '@auth0/auth0-react';
import { ChakraProvider } from '@chakra-ui/react';
// import 'semantic-ui-css/semantic.min.css';

ReactDOM.render(
  <ChakraProvider>
    <Auth0Provider
      domain={'dev-zrtci-fg.us.auth0.com'}
      clientId={'ps2F5BCxlmqpu7cEs8p0x7jixHH75DYR'}
      redirectUri={window.location.origin}
      useRefreshTokens={true}
      audience={'AWSAchievelands'}
      scope='read:current_users'
    >
      <App />
    </Auth0Provider>
  </ChakraProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
