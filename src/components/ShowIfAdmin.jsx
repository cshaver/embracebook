import React from 'react';

import { withRoles } from 'embracebook/utils/components';
import children from 'embracebook/shapes/children';
import { roles } from 'embracebook/shapes/profile';

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
