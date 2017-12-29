import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

import { env } from '../webpack/config/project.config';
import './utils/polyfill';
import './styles/main.scss';

import App from './containers/App';
import Routes from './routes';
import state from './state';

window.env = env;
window.DEV = env === 'development';
window.TEST = env === 'test';
window.PROD = env === 'production';


const render = (Routes) => {
  console.log('rendered');

  ReactDOM.render(
    <AppContainer>
      <Provider store={state.store}>
        <App>
          <Routes />
        </App>
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(Routes);

if (module.hot) {
  module.hot.accept('./routes', () => {
    // eslint-disable-next-line global-require
    const newRoutes = require('./routes').default;
    render(newRoutes);
  });
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

