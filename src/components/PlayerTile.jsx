import React from 'react';
import PropTypes from 'prop-types';

import DeleteButton from 'embracebook/components/form/DeleteButton';
import ProfileLink from 'embracebook/components/ProfileLink';

import profileShape from 'embracebook/shapes/profile';

const propTypes = {
  profile: profileShape.isRequired,
  onDelete: PropTypes.func.isRequired,
  showDelete: PropTypes.bool,
};

const defaultProps = {
  showDelete: false,
};

const PlayerTile = ({
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

PlayerTile.propTypes = propTypes;
PlayerTile.defaultProps = defaultProps;

export default PlayerTile;
