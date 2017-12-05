import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { HOME_PATH, ACCOUNT_PATH, NPC_LIST_PATH, PLAYER_LIST_PATH, LOGIN_PATH } from 'constants'

import classes from './index.scss'

@firebaseConnect()
@connect(({ firebase: { auth, profile } }) => ({
  auth,
  profile
}))
export default class Navbar extends Component {
  logout() {
    this.props.firebase.logout()
    this.context.router.push('/')
  }

  render() {
    const { profile, auth } = this.props
    const dataLoaded = isLoaded(auth, profile)
    const authExists = isLoaded(auth) && !isEmpty(auth)

    if (!dataLoaded) {
      return (
        <nav className={classes.nav} />
      )
    }

    const rightMenu =
      authExists ? (
        <span>
          <img width={40} src={profile.avatarUrl || `https://api.adorable.io/avatars/default.png`} />
          <span>{profile.displayName}</span>
          <button onClick={() => this.context.router.push(ACCOUNT_PATH)}>Account</button>
          <button onClick={this.logout}>Sign out</button>
        </span>
      ) : (
        <span>
          <Link to={LOGIN_PATH}>
            <button>Login</button>
          </Link>
        </span>
      )

    const spacer = ( <span>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span> )

    return (
      <nav className={classes.nav}>
        <Link to={HOME_PATH}>embracebook</Link>
        {spacer}
        <Link to={NPC_LIST_PATH}>Manage NPCs</Link>
        {spacer}
        <Link to={PLAYER_LIST_PATH}>Manage Players</Link>
        {spacer}
        {rightMenu}
      </nav>
    )
  }
}

Navbar.contextTypes = {
  router: PropTypes.object.isRequired
}

Navbar.propTypes = {
  profile: PropTypes.object,
  auth: PropTypes.object,
  firebase: PropTypes.object.isRequired
}
