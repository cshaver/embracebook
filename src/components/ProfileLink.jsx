import React from 'react';
import { Link } from 'react-router-dom';

import profileShape from 'embracebook/shapes/profile';
import children from 'embracebook/shapes/children';

const ProfileLink = ({ profile, children }) => (
  <Link to={`/profile/${profile.uid}/${profile.slug}`}>
    {children || profile.displayName || profile.uid}
  </Link>
);

ProfileLink.propTypes = {
  profile: profileShape.isRequired,
  children,
};

ProfileLink.defaultProps = {
  children: null,
};

export default ProfileLink;
