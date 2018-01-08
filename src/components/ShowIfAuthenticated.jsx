import React from 'react';

import { withAuth } from 'embracebook/utils/components';
import children from 'embracebook/shapes/children';
import { auth } from 'embracebook/shapes/auth';

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
