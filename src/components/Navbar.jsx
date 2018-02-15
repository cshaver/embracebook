import React from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import { HOME_PATH, ACCOUNT_PATH, NPC_LIST_PATH, PLAYER_LIST_PATH } from 'embracebook/constants';

import ShowIfStoryteller from 'embracebook/components/ShowIfStoryteller';
import ShowIfAuthenticated from 'embracebook/components/ShowIfAuthenticated';
import { withFirebase, withProfile } from 'embracebook/utils/components';

import firebaseShape from 'embracebook/shapes/firebase';
import historyShape from 'embracebook/shapes/history';
import profileShape from 'embracebook/shapes/profile';

const propTypes = {
  profile: profileShape.isRequired,
  history: historyShape.isRequired,
  firebase: firebaseShape.isRequired,
};

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
    const { profile } = this.props;

    const spacer = (<span>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>);

    const rightMenu = (
      <ShowIfAuthenticated>
        <img width={40} src={profile.avatarUrl || 'https://api.adorable.io/avatars/default.png'} alt="" />
        <span>{profile.displayName}</span>
        <Link to={ACCOUNT_PATH}>Account</Link>
        <button onClick={this.logout}>Sign out</button>
      </ShowIfAuthenticated>
    );

    const leftMenu = (
      <ShowIfStoryteller>
        {spacer}
        <Link to={NPC_LIST_PATH}>Manage NPCs</Link>
        {spacer}
        <Link to={PLAYER_LIST_PATH}>Manage Players</Link>
        {spacer}
      </ShowIfStoryteller>
    );

    return (
      <nav>
        <Link to={HOME_PATH}>embracebook</Link>
        {leftMenu}
        {rightMenu}
      </nav>
    );
  }
}

Navbar.propTypes = propTypes;

export default compose(
  withFirebase,
  withProfile,
  withRouter,
)(Navbar);
