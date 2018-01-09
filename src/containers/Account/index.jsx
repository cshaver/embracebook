import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  firebaseConnect,
  isLoaded,
} from 'react-redux-firebase';

import { UserIsAuthenticated } from 'embracebook/utils/auth';
import ProgressIndicator from 'embracebook/components/ProgressIndicator';

import firebaseShape from 'embracebook/shapes/firebase';
import profileShape from 'embracebook/shapes/profile';

import AccountForm from './components/AccountForm';


class Account extends React.Component {
  constructor() {
    super();

    this.updateAccount = this.updateAccount.bind(this);
  }

  updateAccount(newData) {
    const { firebase } = this.props;

    delete newData.isLoaded;
    delete newData.isEmpty;

    return firebase
      .updateProfile(newData)
      .catch((err) => {
        console.error('Error updating account', err); // eslint-disable-line no-console
      })
      .then(() => console.groupEnd());
  }

  render() {
    const { profile } = this.props;

    if (!isLoaded(profile)) {
      return <ProgressIndicator />;
    }

    return (
      <div>
        <div>
          <img
            alt=""
            src={(profile.avatarUrl) || 'https://api.adorable.io/avatars/default'}
          />
        </div>
        <div>
          <AccountForm
            initialValues={profile}
            account={profile}
            onSubmit={this.updateAccount}
          />
        </div>
      </div>
    );
  }
}

Account.propTypes = {
  profile: profileShape,
  firebase: firebaseShape.isRequired,
};

Account.defaultProps = {
  profile: {},
};

export default compose(
  firebaseConnect(),
  connect(({ firebase: { profile } }) => ({
    profile,
  })),
  UserIsAuthenticated,
)(Account);
