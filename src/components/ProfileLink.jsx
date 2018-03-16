import React from 'react';
import { Link } from 'react-router-dom';

import profileShape from 'embracebook/shapes/profile';
import children from 'embracebook/shapes/children';

const propTypes = {
  profile: profileShape.isRequired,
  children,
};

const defaultProps = {
  children: null,
};

const ProfileLink = ({ profile, children, styles }) => (
  <Link to={`/profile/${profile.uid}/${profile.slug || ''}`}>
    {children || profile.displayName || profile.uid}
  </Link>
);

ProfileLink.propTypes = propTypes;
ProfileLink.defaultProps = defaultProps;

export default ProfileLink;
