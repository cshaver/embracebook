import React from 'react';
import Navbar from 'embracebook/components/Navbar';

import children from 'embracebook/shapes/children';

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
