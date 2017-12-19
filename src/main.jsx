// eslint-disable no-console

import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './store/createStore';
import { version } from '../package.json';
import { env } from '../webpack/config/project.config';

import './styles/main.scss';

// Window Variables
window.version = version;
window.env = env;

// Store Initialization
// eslint-disable-next-line no-underscore-dangle
const initialState = window.___INITIAL_STATE__ || {
  firebase: { authError: null },
};
const store = createStore(initialState);

// Render Setup
const MOUNT_NODE = document.getElementById('root');

let render = () => {
  // eslint-disable-next-line global-require
  const App = require('./containers/App').default;
  // eslint-disable-next-line global-require
  const routes = require('./routes/index').default(store);

  ReactDOM.render(<App store={store} routes={routes} />, MOUNT_NODE);
};

// Development Tools
// eslint-disable-next-line no-undef
if (DEV) {
  if (module.hot) {
    const renderApp = render;
    const renderError = (error) => {
      // eslint-disable-next-line global-require
      const RedBox = require('redbox-react').default;

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE);
    };

    render = () => {
      try {
        renderApp();
      } catch (e) {
        console.error(e);
        renderError(e);
      }
    };

    // Setup hot module replacement
    module.hot.accept(['./containers/App', './routes/index'], () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE);
        render();
      }));
  }
}

// eslint-disable-next-line no-undef
if (!TEST) render();
