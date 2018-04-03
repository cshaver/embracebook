import React from 'react';
import PropTypes from 'prop-types';

import Button from './form/Button';
import ProfileLink from './ProfileLink';

import profileShape from '../shapes/profile';

const propTypes = {
  profile: profileShape.isRequired,
  onDelete: PropTypes.func.isRequired,
  showDelete: PropTypes.bool,
};

const defaultProps = {
  showDelete: false,
};

class PlayerTile extends React.Component {
  onDelete() {
    const { onDelete, profile: { uid } } = this.props;
    return onDelete(uid);
  }

  render() {
    const { profile, showDelete } = this.props;

    return (
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
  }
}

PlayerTile.propTypes = propTypes;
PlayerTile.defaultProps = defaultProps;

export default PlayerTile;
