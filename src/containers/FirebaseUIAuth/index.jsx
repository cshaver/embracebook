import React, { Component } from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { firebaseConnect } from 'react-redux-firebase';
import * as firebaseui from 'firebaseui';

let authUI;

class FirebaseUIAuth extends Component {
  componentDidMount() {
    const { firebase } = this.props;

    this.uiConfig = this.uiConfig || {
      credentialHelper: firebaseui.auth.CredentialHelper.NONE,
      signInFlow: 'redirect',
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        {
          provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
          recaptchaParameters: {
            size: 'invisible',
          },
        },
      ],
      callbacks: {
        signInSuccess:
          this.props.signInSuccess ||
          this.props.signInSuccessUrl ? (() => true) : (() => false),
      },
      signInSuccessUrl: this.props.signInSuccessUrl,
      tosUrl: this.props.tosUrl,
    };

    // Initialize the FirebaseUI auth widget
    this.ui = authUI || new firebaseui.auth.AuthUI(firebase.auth());
    this.ui.start(this.container, this.uiConfig);
  }

  componentWillUnmount() {
    if (this.ui) {
      this.ui.reset();
    }
  }

  render() {
    return (
      <div
        ref={(element) => {
          this.container = element;
        }}
      />
    );
  }
}

FirebaseUIAuth.propTypes = {
  firebase: PropTypes.object.isRequired,
  tosUrl: PropTypes.string.isRequired,
  signInSuccess: PropTypes.func,
  signInSuccessUrl: PropTypes.string,
};

export default compose(firebaseConnect())(FirebaseUIAuth);
