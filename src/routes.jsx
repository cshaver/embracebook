import React from 'react';
import { Switch, Route } from 'react-router';

import Feed from './containers/Feed';
import Login from './containers/Login';
import Profile from './containers/Profile';
import ProfileList from './containers/ProfileList';
import PlayerList from './containers/PlayerList';
import Account from './containers/Account';
import NoAccess from './components/NoAccess';
import NotFound from './components/NotFound';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Feed} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/profile" component={Profile} />
    <Route exact path="/npcs" component={ProfileList} />
    <Route exact path="/players" component={PlayerList} />
    <Route exact path="/account" component={Account} />
    <Route exact path="/noaccess" component={NoAccess} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
