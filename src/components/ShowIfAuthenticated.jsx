import React from 'react';

import { withAuth } from '../utils/components';
import children from '../shapes/children';
import { auth } from '../shapes/auth';

const ShowIfAuthenticated = ({ auth, children }) => (
  auth.isEmpty ? null :
  <React.Fragment>
    {children}
  </React.Fragment>
);

ShowIfAuthenticated.propTypes = {
  children: children.isRequired,
  auth,
};

ShowIfAuthenticated.defaultProps = {
  auth: {
    isLoaded: false,
    isEmpty: true,
  },
};

export default withAuth(ShowIfAuthenticated);
