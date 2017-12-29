import React from 'react';
import Navbar from '../containers/Navbar';

import children from '../shapes/children';

const Layout = ({ children }) => (
  <div>
    <Navbar />
    <main>{children}</main>
  </div>
);

Layout.propTypes = {
  children: children.isRequired,
};

export default Layout;
