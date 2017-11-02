import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { firebaseConnect } from 'react-redux-firebase'
import * as firebaseui from 'firebaseui'
import { LIST_PATH, TERMS_PATH } from 'constants'

var authUI

@firebaseConnect()
export default class FirebaseUIAuth extends Component {
  componentDidMount() {
    let firebase = this.props.firebase

    this.uiConfig = this.uiConfig || {
      credentialHelper: firebaseui.auth.CredentialHelper.NONE,
      signInFlow: 'popup',
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.PhoneAuthProvider.PROVIDER_ID
      ],
      signInSuccessUrl: LIST_PATH,
      tosUrl: TERMS_PATH
    }

    // Initialize the FirebaseUI auth widget
    this.ui = authUI = authUI || new firebaseui.auth.AuthUI(firebase.auth())
    this.ui.start(this.container, this.uiConfig)
  }

  componentWillUnmount() {
    if (this.ui) {
      this.ui.reset()
    }
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
