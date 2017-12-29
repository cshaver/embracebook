import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';

import { HOME_PATH, ACCOUNT_PATH, NPC_LIST_PATH, PLAYER_LIST_PATH, LOGIN_PATH } from '../../constants';

class Navbar extends React.Component {
  constructor() {
    super();

    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.firebase.logout();
    this.props.history.push('/');
  }

  render() {
    const { profile, auth } = this.props;
    const dataLoaded = isLoaded(auth, profile);
    const authExists = isLoaded(auth) && !isEmpty(auth);

    console.group('NavBar::render');


    if (!dataLoaded) {
      console.groupEnd();
      return (
        <nav />
      );
    }

    console.log('auth', auth);
    console.groupEnd();

    const rightMenu =
      authExists ? (
        <span>
          <img width={40} src={profile.avatarUrl || 'https://api.adorable.io/avatars/default.png'} alt="" />
          <span>{profile.displayName}</span>
          <button onClick={() => this.props.history.push(ACCOUNT_PATH)}>Account</button>
          <button onClick={this.logout}>Sign out</button>
        </span>
      ) : (
        <span>
          <Link to={LOGIN_PATH}>
            <button>Login</button>
          </Link>
        </span>
      );

    const spacer = (<span>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>);

    return (
      <nav>
        <Link to={HOME_PATH}>embracebook</Link>
        {spacer}
        <Link to={NPC_LIST_PATH}>Manage NPCs</Link>
        {spacer}
        <Link to={PLAYER_LIST_PATH}>Manage Players</Link>
        {spacer}
        {rightMenu}
      </nav>
    );
  }
}

Navbar.contextTypes = {
  router: PropTypes.object.isRequired,
};

Navbar.propTypes = {
  profile: PropTypes.object,
  auth: PropTypes.object,
  firebase: PropTypes.object.isRequired,
};

export default compose(
  firebaseConnect(),
  connect(({ firebase: { auth, profile } }) => ({
    auth,
    profile,
  })),
)(withRouter(Navbar));
