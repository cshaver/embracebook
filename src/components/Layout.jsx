import React from 'react';
import PropTypes from 'prop-types';
import Navbar from '../containers/Navbar';

const Layout = ({ children }) => (
  <div>
    <Navbar />
    <main>{children}</main>
  </div>
);

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
