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
  console.group('main::render');
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
  console.groupEnd();
};

render(Routes);

if (module.hot) {
  module.hot.accept('./routes', () => {
    // eslint-disable-next-line global-require
    const newRoutes = require('./routes').default;
    render(newRoutes);
  });
}
