import React from 'react';

import { withRoles } from 'embracebook/utils/components';
import children from 'embracebook/shapes/children';
import { roles } from 'embracebook/shapes/profile';

const ShowIfStoryteller = ({ roles, children }) => (
  !roles.storyteller ? null :
  <React.Fragment>
    {children}
  </React.Fragment>
);

ShowIfStoryteller.propTypes = {
  children: children.isRequired,
  roles,
};

ShowIfStoryteller.defaultProps = {
  roles: {},
};

export default withRoles(ShowIfStoryteller);
