import React from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from './configureStore';
import Navbar from './components/Navbar';
import Page from './components/Page';
import Routes from './routes';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <React.Fragment>
        <Navbar />
        <Page>
          <Routes />
        </Page>
      </React.Fragment>
    </BrowserRouter>
  </Provider>
);

export default hot(module)(App);
