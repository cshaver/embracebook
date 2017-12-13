import React from 'react';
import { Link } from 'react-router';

export const ProfileLink = ({ profile, children, className }) => (
  <Link className={className} to={`/profile/${profile.uid}/${profile.slug}`}>
    {children || profile.displayName || profile.uid}
  </Link>
);

export default ProfileLink;
