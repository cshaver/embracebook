import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// import { withRouter } from '../../utils/components';
import FirebaseUIAuth from '../FirebaseUIAuth';
import NoAccess from '../../components/NoAccess';
import {
  ACCOUNT_PATH,
  HOME_PATH,
  TERMS_PATH,
  INVITE_PATH,
  PLAYER_TYPE,
} from '../../constants';

class LoginPage extends React.Component {
  render() {
    const { pathname, query } = this.props.location;
    if (pathname === INVITE_PATH && !query.code) {
      return (
        <NoAccess />
      );
    }
    return (
      <div>
        <FirebaseUIAuth tosUrl={TERMS_PATH} />
      </div>
    );
  }

  // componentWillReceiveProps(nextProps) {
  //   const {
  //     profile, auth, firebase, location, history,
  //   } = nextProps;

  //   // already logged in
  //   if (!isEmpty(profile) || profile.type) {
  //     history.replace(HOME_PATH);
  //     return;
  //   }

  //   const { pathname, query } = location;

  //   // wait for login
  //   if (isEmpty(auth)) {
  //     return;
  //   }

  //   if (isLoaded(profile)) {
  //     // initialize profile

  //     firebase
  //       .uniqueSet(`profiles/${auth.uid}`, {
  //         type: PLAYER_TYPE,
  //       })
  //       .then(() => {
  //         const newProfile = {
  //           type: PLAYER_TYPE,
  //           createdBy: auth.uid,
  //         };
  //         this.props.firebase
  //           .uniqueSet(`profiles/${auth.uid}`, newProfile)
  //           .then(() => {
  //             history.push(ACCOUNT_PATH);
  //           })
  //           .catch((err) => {
  //             // TODO: Show Snackbar
  //             console.error('error creating new profile', err) // eslint-disable-line
  //           });
  //       })
  //       .catch((err) => {
  //         console.error('Error updating account', err); // eslint-disable-line no-console
  //       });
  //   }
  // }
}

LoginPage.propTypes = {
  firebase: PropTypes.shape({ // eslint-disable-line
    updateProfile: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
  }),
  profile: PropTypes.object,
};

export default compose(
  firebaseConnect(),
  connect(({ firebase: { auth, profile } }) => ({
    profile,
    auth,
  })),
  withRouter,
)(LoginPage);
