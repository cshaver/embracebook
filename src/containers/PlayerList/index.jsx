import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { map } from 'lodash';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';

import ProgressIndicator from 'embracebook/components/ProgressIndicator';
import NoAccess from 'embracebook/components/NoAccess';
import { PLAYER_TYPE } from 'embracebook/constants';

import children from 'embracebook/shapes/children';
import { auth as authShape } from 'embracebook/shapes/firebase';
import profileShape from 'embracebook/shapes/profile';
import userShape from 'embracebook/shapes/user';

import PlayerTile from './components/PlayerTile';

class PlayerList extends React.Component {
  render() {
    const {
      players, auth, profile,
    } = this.props;

    console.groupCollapsed('PlayerList::render');
    console.table(players);
    console.groupEnd();

    if (!isLoaded(players, auth)) {
      return <ProgressIndicator />;
    }

    // Player Route is being loaded
    if (this.props.children) {
      // pass all props to children routes
      return React.cloneElement(this.props.children, this.props);
    }

    if (profile.type === PLAYER_TYPE) {
      return (<NoAccess />);
    }

    return (
      <div>
        <ul>
          {!isEmpty(players) &&
            map(players, (profile, key) => (
              profile.type !== PLAYER_TYPE ? null : <PlayerTile
                key={`${profile.displayName}-Collab-${key}`}
                profile={profile}
              />
            ))}
        </ul>
      </div>
    );
  }
}

PlayerList.propTypes = {
  auth: authShape,
  profile: profileShape,
  players: PropTypes.arrayOf(userShape),
  children,
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
    players: users,
  })),
)(PlayerList);
