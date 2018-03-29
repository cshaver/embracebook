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

const ShowIfStoryteller = ({ roles, children }) => (
  !roles.storyteller ? null :
  <React.Fragment>
    {children}
  </React.Fragment>
);

ShowIfStoryteller.propTypes = propTypes;
ShowIfStoryteller.defaultProps = defaultProps;

export default withRoles(ShowIfStoryteller);
