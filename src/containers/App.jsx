import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Navbar from 'embracebook/components/Navbar';
import children from 'embracebook/shapes/children';

const App = ({ children }) => (
  <BrowserRouter>
    <Navbar />
    <main>
      {children}
    </main>
  </BrowserRouter>
);

App.propTypes = {
  children: children.isRequired,
};

export default App;
