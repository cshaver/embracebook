import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

import 'embracebook/utils/polyfill';
import 'embracebook/styles/main.scss';

import App from 'embracebook/containers/App';
import Routes from 'embracebook/routes';
import state from 'embracebook/state';

import { env } from '../webpack/config/project.config';

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
