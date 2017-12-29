import React from 'react';

import { withRoles } from '../utils/components';
import children from '../shapes/children';
import { roles } from '../shapes/profile';

const ShowIfStoryteller = ({ roles, children }) => (
  !roles.storyteller ? null :
  <span>
    {children}
  </span>
);

ShowIfStoryteller.propTypes = {
  children: children.isRequired,
  roles,
};

ShowIfStoryteller.defaultProps = {
  roles: {},
};

export default withRoles(ShowIfStoryteller);
