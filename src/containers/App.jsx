import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter } from 'react-router-dom';

import Layout from '../components/Layout';

const App = ({ children }) => (
  <BrowserRouter>
    <Layout>
      {children}
    </Layout>
  </BrowserRouter>
);

App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default App;
