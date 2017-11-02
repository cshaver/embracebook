import React from 'react'
import PropTypes from 'prop-types'
import { firebaseConnect } from 'react-redux-firebase'
import { pure, compose } from 'recompose'
import { withRouter } from 'utils/components'
import FirebaseUIAuth from '../FirebaseUIAuth'

import classes from './LoginPage.scss'

export const LoginPage = () => (
  <div className={classes.container}>
    <FirebaseUIAuth />
  </div>
)

LoginPage.propTypes = {
  firebase: PropTypes.shape({ // eslint-disable-line
    login: PropTypes.func.isRequired
  })
}

export default compose(
  pure,
  withRouter,
  firebaseConnect() // add props.firebase
)(LoginPage)
