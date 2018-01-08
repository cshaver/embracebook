import React from 'react';

import { withRoles } from 'embracebook/utils/components';
import children from 'embracebook/shapes/children';
import { roles } from 'embracebook/shapes/profile';

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
