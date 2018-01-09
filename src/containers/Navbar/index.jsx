import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';

import { HOME_PATH, ACCOUNT_PATH, NPC_LIST_PATH, PLAYER_LIST_PATH } from 'embracebook/constants';

import ShowIfStoryteller from 'embracebook/components/ShowIfStoryteller';
import ShowIfAuthenticated from 'embracebook/components/ShowIfAuthenticated';

import firebaseShape, { auth as authShape } from 'embracebook/shapes/firebase';
import historyShape from 'embracebook/shapes/history';
import profileShape from 'embracebook/shapes/profile';

class Navbar extends React.Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
  }

  logout() {
    const { firebase, history } = this.props;
    firebase.logout();
    history.push('/');
  }

  render() {
    const { profile, auth, history } = this.props;
    const dataLoaded = isLoaded(auth, profile);

    console.groupCollapsed('NavBar::render');

    if (!dataLoaded) {
      console.groupEnd();
      return (
        <nav />
      );
    }

    console.log('auth', auth);
    console.groupEnd();

    const rightMenu = (
      <ShowIfAuthenticated>
        <img width={40} src={profile.avatarUrl || 'https://api.adorable.io/avatars/default.png'} alt="" />
        <span>{profile.displayName}</span>
        <button onClick={() => history.push(ACCOUNT_PATH)}>Account</button>
        <button onClick={this.logout}>Sign out</button>
      </ShowIfAuthenticated>
    );

    const spacer = (<span>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>);

    return (
      <nav>
        <Link to={HOME_PATH}>embracebook</Link>
        <ShowIfStoryteller>
          {spacer}
          <Link to={NPC_LIST_PATH}>Manage NPCs</Link>
          {spacer}
          <Link to={PLAYER_LIST_PATH}>Manage Players</Link>
          {spacer}
        </ShowIfStoryteller>
        {rightMenu}
      </nav>
    );
  }
}

Navbar.contextTypes = {
  router: PropTypes.object.isRequired,
};

Navbar.propTypes = {
  profile: profileShape,
  auth: authShape,
  history: historyShape,
  firebase: firebaseShape.isRequired,
};

Navbar.defaultProps = {
  profile: null,
  auth: null,
  history: null,
};

export default compose(
  firebaseConnect(),
  connect(({ firebase: { auth, profile } }) => ({
    auth,
    profile,
  })),
)(withRouter(Navbar));
