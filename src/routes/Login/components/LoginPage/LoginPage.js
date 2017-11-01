import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { firebaseConnect } from 'react-redux-firebase'
import { withHandlers, pure, compose } from 'recompose'
import { withNotifications } from 'modules/notification'
import { withRouter } from 'utils/components'
import { SIGNUP_PATH, LIST_PATH } from 'constants'
import FirebaseUIAuth from '../FirebaseUIAuth'

import classes from './LoginPage.scss'

export const LoginPage = ({ emailLogin, onSubmitFail }) => (
  <div className={classes.container}>
    <FirebaseUIAuth onSubmit={emailLogin} />
    <div className={classes.signup}>
      <span className={classes.signupLabel}>Need an account?</span>
      <Link className={classes.signupLink} to={SIGNUP_PATH}>
        Sign Up
      </Link>
    </div>
  </div>
)

LoginPage.propTypes = {
  firebase: PropTypes.shape({ // eslint-disable-line
    login: PropTypes.func.isRequired
  }),
  emailLogin: PropTypes.func,
  onSubmitFail: PropTypes.func
}

export default compose(
  pure,
  withRouter,
  withNotifications, // add props.showError
  firebaseConnect(), // add props.firebase
  withHandlers({
    onSubmitFail: props => (formErrs, dispatch, err) =>
      props.showError(formErrs ? 'Form Invalid' : err.message || 'Error'),
    emailLogin: ({ firebase, router }) => creds =>
      firebase.login(creds).then(() => router.push(LIST_PATH))
  })
)(LoginPage)
