import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { isObject } from 'lodash';

import DeleteButton from 'components/form/DeleteButton';
import ProfileLink from 'components/ProfileLink';
import classes from './index.scss';

export const ProfileTile = ({
  profile, onSelect, onDelete, showDelete,
}) => (
  <li className={classes.container}>
    <ProfileLink className={classes.avatar} profile={profile}>
      <img src={profile.avatarUrl} height="50" />
    </ProfileLink>
    <div className={classes.top}>
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
