import React from 'react';
import ReactDOM from 'react-dom';

import { env } from '../webpack/config/project.config';
import './utils/polyfill';
import './styles/main.scss';

import createStore from './store/createStore';

window.env = env;
window.DEV = env === 'development';
window.TEST = env === 'test';
window.PROD = env === 'production';

const initialState = /* window.___INITIAL_STATE__ || */{
  firebase: { authError: null },
};

// DOM node to mount
const MOUNT_NODE = document.getElementById('root');

let render = () => {
  // eslint-disable-next-line global-require
  const App = require('./containers/App').default;

  const store = createStore(initialState);

  ReactDOM.render(<App store={store} />, MOUNT_NODE);
};

// dev tools
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
        // eslint-disable-next-line no-console
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
