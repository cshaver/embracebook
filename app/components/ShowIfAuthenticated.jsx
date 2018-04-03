import React from 'react';

import { withAuth } from '../utils/components';
import children from '../shapes/children';
import { auth } from '../shapes/auth';

const propTypes = {
  children: children.isRequired,
  auth,
};

const defaultProps = {
  auth: {
    isLoaded: false,
    isEmpty: true,
  },
};

const ShowIfAuthenticated = ({ auth, children }) => (
  auth.isEmpty ? null :
  <React.Fragment>
    {children}
  </React.Fragment>
);

ShowIfAuthenticated.propTypes = propTypes;
ShowIfAuthenticated.defaultProps = defaultProps;

export default withAuth(ShowIfAuthenticated);
