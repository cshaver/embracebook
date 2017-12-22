import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import { env } from '../webpack/config/project.config';
import './utils/polyfill';
import './styles/main.scss';

import App from './containers/App';
import createStore from './store/createStore';

window.env = env;
window.DEV = env === 'development';
window.TEST = env === 'test';
window.PROD = env === 'production';


const render = (Component) => {
  console.log('rendered');
  const store = createStore();

  ReactDOM.render(
    <AppContainer>
      <Component store={store} />
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(App);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./containers/App', () => { render(App); });
}

// dev tools
// if (module.hot) {
//   const renderApp = render;
//   const renderError = (error) => {
//     // eslint-disable-next-line global-require
//     const RedBox = require('redbox-react').default;

//     ReactDOM.render(<RedBox error={error} />, MOUNT_NODE);
//   };

//   render = () => {
//     try {
//       renderApp();
//     } catch (e) {
//       // eslint-disable-next-line no-console
//       console.error(e);
//       renderError(e);
//     }
//   };

//   // Setup hot module replacement
//   module.hot.accept(['./containers/App', './routes/index'], () =>
//     setImmediate(() => {
//       ReactDOM.unmountComponentAtNode(MOUNT_NODE);
//       render();
//     }));
// }

// eslint-disable-next-line no-undef
if (!TEST) render();
