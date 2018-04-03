import React from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import { HOME_PATH, ACCOUNT_PATH, NPC_LIST_PATH, PLAYER_LIST_PATH } from '../constants';

import ShowIfStoryteller from './ShowIfStoryteller';
import ShowIfAuthenticated from './ShowIfAuthenticated';
import { withFirebase, withProfile } from '../utils/components';
import { withStyles, withStylesPropTypes } from './utils/withStyles';
import Button from './form/Button';

import firebaseShape from '../shapes/firebase';
import historyShape from '../shapes/history';
import profileShape from '../shapes/profile';

const propTypes = {
  ...withStylesPropTypes,
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
    const { css, profile, styles } = this.props;

    const spacer = (<span>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>);

    const rightMenu = (
      <ShowIfAuthenticated>
        <img width={40} src={profile.avatarUrl || 'https://api.adorable.io/avatars/default.png'} alt="" />
        <span>{profile.displayName}</span>
        <Link to={ACCOUNT_PATH}>Account</Link>
        <Button onClick={this.logout} copy="Sign out" />
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
      <nav {...css(styles.container)}>
        <Link to={HOME_PATH}>embracebook</Link>
        {leftMenu}
        {rightMenu}
      </nav>
    );
  }
}

Navbar.propTypes = propTypes;

export default compose(
  withStyles(({ color }) => ({
    container: {
      background: color.secondary,
      padding: '1em',
      borderBottom: `3px solid ${color.dimmed}`,
    },
  })),
  withFirebase,
  withProfile,
  withRouter,
)(Navbar);
