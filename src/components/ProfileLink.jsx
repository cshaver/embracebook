import React from 'react';
import { Link } from 'react-router';

const ProfileLink = ({ profile, children }) => (
  <Link to={`/profile/${profile.uid}/${profile.slug}`}>
    {children || profile.displayName || profile.uid}
  </Link>
);

export default ProfileLink;
