import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import Navbar from 'embracebook/components/Navbar';

import './utils/polyfill';
import './styles/main.scss';

import state from './state';
import Routes from './routes';

const App = () => (
  <Provider store={state.store}>
    <BrowserRouter>
      <React.Fragment>
        <Navbar />
        <Routes />
      </React.Fragment>
    </BrowserRouter>
  </Provider>
);

export default App;
