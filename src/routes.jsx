import React from 'react';
import { Switch, Route } from 'react-router';

import PostListContainer from './containers/PostListContainer';
import Login from './containers/Login';
import Profile from './components/Profile';
import NPCList from './containers/NPCList';
import PlayerList from './containers/PlayerList';
import Account from './containers/Account';
// import Invite from './containers/Invite';
import NoAccess from './components/NoAccess';
import NotFound from './components/NotFound';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={PostListContainer} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/profile" component={Profile} />
    <Route exact path="/npcs" component={NPCList} />
    <Route exact path="/players" component={PlayerList} />
    <Route exact path="/account" component={Account} />
    <Route exact path="/noaccess" component={NoAccess} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
