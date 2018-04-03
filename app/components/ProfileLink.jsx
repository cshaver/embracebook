import React from 'react';
import { Link } from 'react-router-dom';

import profileShape from '../shapes/profile';
import children from '../shapes/children';

const propTypes = {
  profile: profileShape.isRequired,
  children,
};

const defaultProps = {
  children: null,
};

const ProfileLink = ({ profile, children }) => (
  <Link to={`/profile/${profile.uid}/${profile.slug || ''}`}>
    {children || profile.displayName || profile.uid}
  </Link>
);

ProfileLink.propTypes = propTypes;
ProfileLink.defaultProps = defaultProps;

export default ProfileLink;
