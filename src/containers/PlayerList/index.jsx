import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { map } from 'lodash';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';

import { PLAYER_TYPE } from 'embracebook/constants';
import ProgressIndicator from 'embracebook/components/ProgressIndicator';
import PlayerTile from './components/PlayerTile';
import NoAccess from 'embracebook/components/NoAccess';

import children from 'embracebook/shapes/children';

class PlayerList extends React.Component {
  render() {
    const {
      users, players, auth, profile,
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

PlayerList.contextTypes = {
  router: PropTypes.object.isRequired,
  firebase: PropTypes.object,
};

PlayerList.propTypes = {
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object,
  children,
};

export default compose(
  firebaseConnect([{ path: 'users' }]),
  // Map state to props
  connect(({ firebase, firebase: { auth, profile, data: { users } } }) => ({
    auth,
    profile,
    players: users,
  })),
)(PlayerList);
