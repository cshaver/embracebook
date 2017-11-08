import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { withRouter } from 'utils/components'
import FirebaseUIAuth from 'containers/FirebaseUIAuth'
import { ACCOUNT_PATH, POST_LIST_PATH, TERMS_PATH } from 'constants'

import classes from './index.scss'

@firebaseConnect()
@connect(({ firebase: { auth, profile } }) => ({
  profile,
  auth
}))
@withRouter
export default class LoginPage extends Component {
  render() {
    return (
      <div className={classes.container}>
        <FirebaseUIAuth
          signInSuccess={this.signInSuccess}
          signInSuccessUrl={POST_LIST_PATH}
          tosUrl={TERMS_PATH}
          />
      </div>
    )
  }

  componentWillReceiveProps(nextProps) {
    const { profile, firebase, router } = nextProps;

    if (isLoaded(profile)) {
      if (isEmpty(profile)) {
        // initialize profile
        firebase
          .updateProfile({
            type: 'STORYTELLER'
          })
          .then(() => {
            router.push(ACCOUNT_PATH)
          })
          .catch(err => {
            console.error('Error updating account', err) // eslint-disable-line no-console
          })
      } else {
        router.push(POST_LIST_PATH)
      }
    }
  }

  signInSuccess() {
    return false
  }

  static propTypes = {
    firebase: PropTypes.shape({ // eslint-disable-line
      updateProfile: PropTypes.func.isRequired,
      login: PropTypes.func.isRequired
    }),
    profile: PropTypes.object
  }
}
