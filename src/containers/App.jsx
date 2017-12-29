import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter } from 'react-router-dom';

import Layout from '../components/Layout';

import children from '../shapes/children';

const App = ({ children }) => (
  <BrowserRouter>
    <Layout>
      {children}
    </Layout>
  </BrowserRouter>
);

App.propTypes = {
  children: children.isRequired,
};

export default App;
