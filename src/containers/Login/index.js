import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { withRouter } from 'utils/components'
import FirebaseUIAuth from 'containers/FirebaseUIAuth'
import NoAccess from 'components/NoAccess'
import {
  ACCOUNT_PATH,
  HOME_PATH,
  TERMS_PATH,
  INVITE_PATH,
  PLAYER_TYPE
} from 'constants'

import classes from './index.scss'

@firebaseConnect()
@connect(({ firebase: { auth, profile } }) => ({
  profile,
  auth
}))
@withRouter
export default class LoginPage extends Component {
  render() {
    const { pathname, query } = this.props.router.location
    if (pathname === INVITE_PATH && !query.code) {
      return (
        <NoAccess />
      )
    }
    return (
      <div className={classes.container}>
        <FirebaseUIAuth tosUrl={TERMS_PATH} />
      </div>
    )
  }

  componentWillReceiveProps(nextProps) {
    const { profile, auth, firebase, router } = nextProps

    // already logged in
    if (!isEmpty(profile) || profile.type) {
      router.push(HOME_PATH)
      return
    }

    const { pathname, query } = router.location

    // wait for login
    if (isEmpty(auth)) {
      return
    }

    if (isLoaded(profile)) {
      // initialize profile

      firebase
        .uniqueSet(`profiles/${auth.uid}`, {
          type: PLAYER_TYPE
        })
        .then(() => {
          let newProfile = {
            type: PLAYER_TYPE,
            createdBy: auth.uid
          }
          this.props.firebase
            .uniqueSet(`profiles/${auth.uid}`, newProfile)
            .then(() => {
              router.push(ACCOUNT_PATH)
            })
            .catch(err => {
              // TODO: Show Snackbar
              console.error('error creating new profile', err) // eslint-disable-line
            })
        })
        .catch(err => {
          console.error('Error updating account', err) // eslint-disable-line no-console
        })
    }
  }

  static propTypes = {
    firebase: PropTypes.shape({ // eslint-disable-line
      updateProfile: PropTypes.func.isRequired,
      login: PropTypes.func.isRequired
    }),
    profile: PropTypes.object
  }
}
