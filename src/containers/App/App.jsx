import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import Layout from '../../components/Layout';
// import {
import Account from '../../routes/account/index';
import Feed from '../../routes/feed/index';
import Login from '../../routes/login/index';
import NoAccess from '../../routes/no-access/index';
import NotFound from '../../routes/not-found/index';
import NPCs from '../../routes/npcs/index';
import Players from '../../routes/players/index';
import Profile from '../../routes/profile/index';
// } from '../../routes/index';

const App = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/feed" component={Feed} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
          <Route path="/npcs" component={NPCs} />
          <Route path="/players" component={Players} />
          <Route path="/account" component={Account} />
          <Route path="/noaccess" component={NoAccess} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  </Provider>
);

App.propTypes = {
  // routes: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};

export default App;
