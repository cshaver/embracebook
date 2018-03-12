import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { map } from 'lodash';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';

import ProgressIndicator from 'embracebook/components/ProgressIndicator';
import InviteForm from 'embracebook/components/InviteForm';
import PlayerTile from 'embracebook/components/PlayerTile';
import { userIsStoryteller } from 'embracebook/utils/components';

import firebaseShape, { auth as authShape } from 'embracebook/shapes/firebase';
import userShape from 'embracebook/shapes/user';


const propTypes = {
  auth: authShape,
  players: PropTypes.arrayOf(userShape),
  firebase: firebaseShape.isRequired,
};

const defaultProps = {
  auth: null,
  players: [],
};

class PlayerList extends React.Component {
  constructor(props) {
    super(props);

    this.inviteUser = this.inviteUser.bind(this);
  }

  inviteUser(values) {
    const { firebase } = this.props;
    const { email, roles } = values;

    return firebase.pushWithMeta('invites', {
      email,
      roles,
    }).then(() => {
      console.log('invite complete');
    });
  }

  render() {
    const { players, auth } = this.props;

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
        <InviteForm onInvite={this.inviteUser} />
      </div>
    );
  }
}

PlayerList.propTypes = propTypes;
PlayerList.defaultProps = defaultProps;

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
