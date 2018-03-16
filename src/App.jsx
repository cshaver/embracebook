import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import Navbar from 'embracebook/components/Navbar';

import './utils/polyfill';
import './styles/main.scss';

import store from './configureStore';
import Routes from './routes';

console.log(store);

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <React.Fragment>
        <Navbar />
        <Routes />
      </React.Fragment>
    </BrowserRouter>
  </Provider>
);

export default App;

