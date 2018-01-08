import React from 'react';
import PropTypes from 'prop-types';

import DeleteButton from 'embracebook/components/form/DeleteButton';
import ProfileLink from 'embracebook/components/ProfileLink';

export const ProfileTile = ({
  profile, onSelect, onDelete, showDelete,
}) => (
  <li>
    <ProfileLink profile={profile}>
      <img src={profile.avatarUrl} height="50" />
    </ProfileLink>
    <div>
      <ProfileLink profile={profile} />
      <DeleteButton showDelete={showDelete} onDelete={onDelete} />
      <br />
      <i>{profile.createdBy ? `Created by ${profile.createdBy.displayName}` : ''}</i>
    </div>
  </li>
);

ProfileTile.propTypes = {
  profile: PropTypes.object.isRequired,
  onDelete: PropTypes.func,
  showDelete: PropTypes.bool,
};

export default ProfileTile;
