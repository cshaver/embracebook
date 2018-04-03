import React from 'react';
import PropTypes from 'prop-types';
import { compose, wrapDisplayName } from 'recompose';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

import ProgressIndicator from '../components/ProgressIndicator';
import NoAccess from '../components/NoAccess';

import { roles as rolesShape } from '../shapes/profile';

export const withFirebase = firebaseConnect();
export const withAuth = compose(connect(({ firebase: { auth } }) => ({ auth })));
export const withProfile = compose(connect(({ firebase: { profile } }) => ({ profile })));

export const withRoles = compose(connect(({ firebase: { auth, profile, profile: { roles } } }) => ({
  isLoaded: profile.isLoaded,
  auth,
  roles: {
    isEmpty: !roles,
    ...roles,
  },
})));

export const withLoading = function withLoading(WrappedComponent) {
  const Component = (props) => {
    const { isLoaded } = props;

    if (isLoaded) {
      return (<WrappedComponent {...props} />);
    }

    return (<ProgressIndicator />);
  };

  Component.propTypes = {
    isLoaded: PropTypes.bool.isRequired,
  };

  Component.displayName = wrapDisplayName(WrappedComponent, 'withLoading');

  return Component;
};

export const userIsStoryteller = function userIsStoryteller(WrappedComponent) {
  const Component = (props) => {
    const { roles } = props;

    if (roles.storyteller) {
      return (<WrappedComponent {...props} />);
    }

    return (<NoAccess />);
  };

  Component.propTypes = {
    roles: rolesShape.isRequired,
  };

  Component.displayName = wrapDisplayName(WrappedComponent, 'userIsStoryteller');

  return withRoles(Component);
};
