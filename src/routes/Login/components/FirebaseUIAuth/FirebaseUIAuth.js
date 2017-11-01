import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { firebaseConnect } from 'react-redux-firebase'
import * as firebaseui from 'firebaseui'
import { LIST_PATH, TERMS_PATH } from 'constants'

var authUI

@firebaseConnect()
export default class FirebaseUIAuth extends Component {
  componentDidMount() {
    this.uiConfig = {
      credentialHelper: firebaseui.auth.CredentialHelper.NONE,
      signInFlow: 'popup',
      signInOptions: [
        this.props.firebase.auth.EmailAuthProvider.PROVIDER_ID,
        this.props.firebase.auth.PhoneAuthProvider.PROVIDER_ID
      ],
      signInSuccessUrl: LIST_PATH,
      tosUrl: TERMS_PATH
    }

    // Initialize the FirebaseUI auth widget
    this.ui = authUI =
      authUI || new firebaseui.auth.AuthUI(this.props.firebase.auth())

    this.ui.start(this.container, this.uiConfig)
  }

  componentWillUnmount() {
    this.ui.reset()
  }

  render() {
    return (
      <div ref={(element) => {this.container = element}} />
    )
  }

  static propTypes = {
    firebase: PropTypes.object.isRequired
  }
}
