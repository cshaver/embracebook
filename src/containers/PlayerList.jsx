import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { map } from 'lodash';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';

import ProgressIndicator from 'embracebook/components/ProgressIndicator';
import Invite from 'embracebook/containers/Invite';

import { userIsStoryteller } from 'embracebook/utils/components';

import children from 'embracebook/shapes/children';
import { auth as authShape } from 'embracebook/shapes/firebase';
import profileShape from 'embracebook/shapes/profile';
import userShape from 'embracebook/shapes/user';

import PlayerTile from 'embracebook/components/PlayerTile';

class PlayerList extends React.Component {
  render() {
    const {
      players, auth,
    } = this.props;

    console.groupCollapsed('PlayerList::render');
    console.table(players);
    console.groupEnd();

    if (!isLoaded(players, auth)) {
      return <ProgressIndicator />;
    }

    return (
      <div>
        <ul>
          {/* TODO: test for NPC-type profile */}
          {map(players, (profile, key) => (
            <PlayerTile
              key={`${profile.displayName}-Collab-${key}`}
              profile={profile}
            />
          ))}
        </ul>
        <Invite onSubmit={this.inviteUser} />
      </div>
    );
  }
}

PlayerList.propTypes = {
  auth: authShape,
  // profile: profileShape,
  players: PropTypes.arrayOf(userShape),
  // children,
};

PlayerList.defaultProps = {
  auth: null,
  profile: null,
  players: [],
  children: null,
};

export default compose(
  firebaseConnect([{ path: 'users' }]),
  // Map state to props
  connect(({ firebase: { auth, profile, data: { users } } }) => ({
    auth,
    profile,
    players: map(users, (user, uid) => ({ ...user, uid })),
  })),
  userIsStoryteller,
)(PlayerList);
