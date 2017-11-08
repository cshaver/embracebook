import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { POST_LIST_PATH, ACCOUNT_PATH, LOGIN_PATH } from 'constants'

import classes from './index.scss'

@firebaseConnect()
@connect(({ firebase: { auth, profile } }) => ({
  auth,
  profile
}))
export default class Navbar extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  static propTypes = {
    profile: PropTypes.object,
    auth: PropTypes.object,
    firebase: PropTypes.object.isRequired
  }

  logout = () => {
    this.props.firebase.logout()
    this.context.router.push('/')
  }

  render() {
    const { profile, auth } = this.props
    const dataLoaded = isLoaded(auth, profile)
    const authExists = isLoaded(auth) && !isEmpty(auth)

    const rightMenu =
      dataLoaded && authExists ? (
        <div>
          <div>
            <img width={40} src={profile.avatarUrl} />
            <span>{profile.displayName}</span>
          </div>
          <button onClick={() => this.context.router.push(ACCOUNT_PATH)}>Account</button>
          <button onClick={this.logout}>Sign out</button>
        </div>
      ) : (
        <div>
          <Link to={LOGIN_PATH}>
            <button>Login</button>
          </Link>
        </div>
      )

    return (
      <div className={classes.nav}>
        <Link to='/'>embracebook</Link>
        {rightMenu}
      </div>
    )
  }
}
