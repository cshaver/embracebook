import React from 'react';

import { withRoles } from 'embracebook/utils/components';
import children from 'embracebook/shapes/children';
import { roles } from 'embracebook/shapes/profile';

const propTypes = {
  children: children.isRequired,
  roles,
};

const defaultProps = {
  roles: {},
};

const ShowIfAdmin = ({ roles, children }) => (
  !roles.player ? null :
  <span>
    {children}
  </span>
);

ShowIfAdmin.propTypes = propTypes;
ShowIfAdmin.defaultProps = defaultProps;

export default withRoles(ShowIfAdmin);
