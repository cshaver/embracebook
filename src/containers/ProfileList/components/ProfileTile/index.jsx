import React from 'react';
import PropTypes from 'prop-types';

import DeleteButton from 'embracebook/components/form/DeleteButton';
import ProfileLink from 'embracebook/components/ProfileLink';

import profileShape from 'embracebook/shapes/profile';

const ProfileTile = ({
  profile, onDelete, showDelete,
}) => (
  <li>
    <ProfileLink profile={profile}>
      <img alt="" src={profile.avatarUrl} height="50" />
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
  profile: profileShape,
  onDelete: PropTypes.func,
  showDelete: PropTypes.bool,
};

ProfileTile.defaultProps = {
  profile: {},
  onDelete: null,
  showDelete: false,
};

export default ProfileTile;
