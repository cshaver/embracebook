import React from 'react';

import { withRoles } from '../utils/components';
import children from '../shapes/children';
import { roles } from '../shapes/profile';

const ShowIfAdmin = ({ roles, children }) => (
  !roles.player ? null :
  <span>
    {children}
  </span>
);

ShowIfAdmin.propTypes = {
  children: children.isRequired,
  roles,
};

ShowIfAdmin.defaultProps = {
  roles: {},
};

export default withRoles(ShowIfAdmin);
