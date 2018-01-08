import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter } from 'react-router-dom';

import Layout from 'embracebook/components/Layout';

import children from 'embracebook/shapes/children';

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
