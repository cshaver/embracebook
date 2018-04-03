import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { firebaseConnect } from 'react-redux-firebase';
import * as firebaseui from 'firebaseui';

import firebaseShape from '../shapes/firebase';

let authUI;

const propTypes = {
  firebase: firebaseShape.isRequired,
  tosUrl: PropTypes.string.isRequired,
  signInSuccess: PropTypes.func,
  signInSuccessUrl: PropTypes.string,
};

const defaultProps = {
  signInSuccess: null,
  signInSuccessUrl: null,
};

class FirebaseUIAuth extends React.Component {
  componentDidMount() {
    const {
      firebase,
      signInSuccess,
      signInSuccessUrl,
      tosUrl,
    } = this.props;

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
          signInSuccess ||
          signInSuccessUrl ? (() => true) : (() => false),
      },
      signInSuccessUrl,
      tosUrl,
    };

    // Initialize the FirebaseUI auth widget
    authUI = authUI || new firebaseui.auth.AuthUI(firebase.auth());
    this.ui = authUI;
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

FirebaseUIAuth.propTypes = propTypes;
FirebaseUIAuth.defaultProps = defaultProps;

export default compose(firebaseConnect())(FirebaseUIAuth);
