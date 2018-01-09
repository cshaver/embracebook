import React from 'react';
import PropTypes from 'prop-types';
import { compose, withContext, getContext } from 'recompose';
import { connect } from 'react-redux';

import ProgressIndicator from 'embracebook/components/ProgressIndicator';
import NoAccess from 'embracebook/components/NoAccess';

import { roles as rolesShape } from 'embracebook/shapes/profile';

export function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export const withStore = compose(
  withContext({ store: PropTypes.object }, () => {}),
  getContext({ store: PropTypes.object }),
);

export const withRouter = compose(
  withContext({ router: PropTypes.object }, () => {}),
  getContext({ router: PropTypes.object }),
);

export const withStoreAndRouter = compose(
  withContext({ router: PropTypes.object, store: PropTypes.object }, () => {}),
  getContext({ router: PropTypes.object, store: PropTypes.object }),
);

export const withProfile = compose(connect(({ firebase: { profile } }) => ({ profile })));

export const withRoles = compose(connect(({ firebase: { profile, profile: { roles } } }) => ({
  isLoaded: profile.isLoaded,
  roles: {
    isEmpty: !roles,
    ...roles,
  },
})));

export const withAuth = compose(connect(({ firebase: { auth } }) => ({ auth })));

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

  Component.displayName = `withLoading(${getDisplayName(WrappedComponent)})`;

  return withRoles(Component);
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

  Component.displayName = `userIsStoryteller(${getDisplayName(WrappedComponent)})`;

  return withLoading(withRoles(Component));
};
