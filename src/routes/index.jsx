import React from 'react';
import { Switch, Route } from 'react-router';

import Feed from './feed';
import Login from './login';
import Profile from './profile';
import NPCs from './npcs';
import Players from './players';
import Account from './account';
import NotFound from './not-found';
import NoAccess from './no-access';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Feed} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/profile" component={Profile} />
    <Route exact path="/npcs" component={NPCs} />
    <Route exact path="/players" component={Players} />
    <Route exact path="/account" component={Account} />
    <Route exact path="/noaccess" component={NoAccess} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
