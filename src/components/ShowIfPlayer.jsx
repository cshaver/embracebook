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

const ShowIfPlayer = ({ roles, children }) => (
  !roles.player ? null :
  <span>
    {children}
  </span>
);

ShowIfPlayer.propTypes = propTypes;
ShowIfPlayer.defaultProps = defaultProps;

export default withRoles(ShowIfPlayer);
