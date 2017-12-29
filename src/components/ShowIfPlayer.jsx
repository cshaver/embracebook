import React from 'react';

import { withRoles } from '../utils/components';
import children from '../shapes/children';
import { roles } from '../shapes/profile';

const ShowIfPlayer = ({ roles, children }) => (
  !roles.player ? null :
  <span>
    {children}
  </span>
);

ShowIfPlayer.propTypes = {
  children: children.isRequired,
  roles,
};

ShowIfPlayer.defaultProps = {
  roles: {},
};

export default withRoles(ShowIfPlayer);
