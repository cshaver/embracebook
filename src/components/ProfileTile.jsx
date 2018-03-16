import React from 'react';
import PropTypes from 'prop-types';

import Button from 'embracebook/components/form/Button';
import ProfileLink from 'embracebook/components/ProfileLink';

import profileShape from 'embracebook/shapes/profile';

const propTypes = {
  profile: profileShape,
  onDelete: PropTypes.func,
  showDelete: PropTypes.bool,
};

const defaultProps = {
  profile: {},
  onDelete: null,
  showDelete: false,
};

const ProfileTile = ({
  profile, onDelete, showDelete,
}) => (
  <li>
    <ProfileLink profile={profile}>
      <img alt="" src={profile.avatarUrl} height="50" />
    </ProfileLink>
    <div>
      <ProfileLink profile={profile} />
      {showDelete && <Button copy="Delete" onPress={this.onDelete} />}
      <br />
      <i>{profile.createdBy ? `Created by ${profile.createdBy.displayName}` : ''}</i>
    </div>
  </li>
);

ProfileTile.propTypes = propTypes;
ProfileTile.defaultProps = defaultProps;

export default ProfileTile;
