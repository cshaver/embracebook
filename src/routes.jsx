import React from 'react';
import Loadable from 'react-loadable';
import { Switch, Route } from 'react-router';

import ProgressIndicator from './components/ProgressIndicator';

// import Invite from './containers/Invite';

const LoadablePostListContainer = Loadable({
  loader: () => import(
    /* webpackChunkName: "PostListContainer" */
    './containers/PostListContainer',
  ),
  loading: ProgressIndicator,
});

const LoadableLogin = Loadable({
  loader: () => import(
    /* webpackChunkName: "Login" */
    './containers/Login',
  ),
  loading: ProgressIndicator,
});

const LoadableProfile = Loadable({
  loader: () => import(
    /* webpackChunkName: "Profile" */
    './components/Profile',
  ),
  loading: ProgressIndicator,
});

const LoadableNPCList = Loadable({
  loader: () => import(
    /* webpackChunkName: "NPCList" */
    './containers/NPCList',
  ),
  loading: ProgressIndicator,
});

const LoadablePlayerList = Loadable({
  loader: () => import(
    /* webpackChunkName: "PlayerList" */
    './containers/PlayerList',
  ),
  loading: ProgressIndicator,
});

const LoadableAccount = Loadable({
  loader: () => import(
    /* webpackChunkName: "Account" */
    './containers/Account',
  ),
  loading: ProgressIndicator,
});

const LoadableNoAccess = Loadable({
  loader: () => import(
    /* webpackChunkName: "NoAccess" */
    './components/NoAccess',
  ),
  loading: ProgressIndicator,
});

const LoadableNotFound = Loadable({
  loader: () => import(
    /* webpackChunkName: "NotFound" */
    './components/NotFound',
  ),
  loading: ProgressIndicator,
});

const Routes = () => (
  <Switch>
    <Route exact path="/" component={LoadablePostListContainer} />
    <Route exact path="/login" component={LoadableLogin} />
    <Route exact path="/profile" component={LoadableProfile} />
    <Route exact path="/npcs" component={LoadableNPCList} />
    <Route exact path="/players" component={LoadablePlayerList} />
    <Route exact path="/account" component={LoadableAccount} />
    <Route exact path="/noaccess" component={LoadableNoAccess} />
    <Route component={LoadableNotFound} />
  </Switch>
);

export default Routes;
