import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  firebaseConnect,
  isLoaded,
} from 'react-redux-firebase';

import { UserIsAuthenticated } from '../utils/auth';
import ProgressIndicator from '../../components/ProgressIndicator';
import AccountForm from './components/AccountForm';


class Account extends React.Component {
  updateAccount(newData) {
    delete newData.isLoaded;
    delete newData.isEmpty;

    return this.props.firebase
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
            src={(profile && profile.avatarUrl) || `https://api.adorable.io/avatars//${profile && profile.email}`}
            onClick={this.toggleModal}
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
  profile: PropTypes.object,
  firebase: PropTypes.shape({
    updateProfile: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
  }),
};

export default compose(
  firebaseConnect(),
  connect(({ firebase: { profile } }) => ({
    profile,
  })),
  UserIsAuthenticated,
)(Account);
