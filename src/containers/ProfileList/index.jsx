import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import { connect } from 'react-redux';
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
} from 'react-redux-firebase';

import ProgressIndicator from 'embracebook/components/ProgressIndicator';
import NoAccess from 'embracebook/components/NoAccess';
import { NPC_TYPE, PLAYER_TYPE } from 'embracebook/constants';
import { UserIsAuthenticated } from 'embracebook/utils/auth';

import children from 'embracebook/shapes/children';
import profileShape from 'embracebook/shapes/profile';
import firebaseShape, { auth as authShape } from 'embracebook/shapes/firebase';

import ProfileTile from './components/ProfileTile';
import NewProfileTile from './components/NewProfileTile';
import NewProfileDialog from './components/NewProfileDialog';
import { toggleNewProfileModal } from './actions';

const populates = [{ child: 'createdBy', root: 'users', keyProp: 'uid' }];

class ProfileList extends React.Component {
  getDeleteVisible(key) {
    const { auth, profiles } = this.props;
    return (
      !isEmpty(this.props.auth) &&
      profiles[key] &&
      profiles[key].createdBy.uid === auth.uid
    );
  }

  toggleModal(open) {
    this.props.toggleNewProfileModal({
      open,
    });
  }

  deleteProfile(key) {
    const { profiles, firebase } = this.props;
    firebase.remove(`profiles/${profiles[key].uid}`);
  }

  newSubmit(newProfile) {
    newProfile.createdBy = this.props.auth.uid;
    // newProfile.type = NPC_TYPE;

    return this.props.firebase
      .push('profiles', newProfile)
      .then(() => this.toggleModal(false))
      .catch((err) => {
        // TODO: Show Snackbar
        console.error('error creating new profile', err) // eslint-disable-line
      });
  }

  render() {
    const {
      profiles, auth, profile, newProfileModal,
    } = this.props;

    console.group('ProfileList::render');
    console.table(profiles);
    console.groupEnd();

    if (!isLoaded(profiles, auth)) {
      return <ProgressIndicator />;
    }

    // Profile Route is being loaded
    if (this.props.children) {
      // pass all props to children routes
      return React.cloneElement(this.props.children, this.props);
    }

    if (profile.type === PLAYER_TYPE) {
      return (<NoAccess />);
    }

    return (
      <div>
        {newProfileModal && (
          <NewProfileDialog
            open={newProfileModal}
            onSubmit={this.newSubmit}
            onRequestClose={() => this.toggleModal(false)}
            initialValues={{
              avatarUrl: 'https://api.adorable.io/avatars/default.png',
            }}
          />
        )}
        <ul>
          <NewProfileTile onClick={() => this.toggleModal(true)} />
          {!isEmpty(profiles) &&
            map(profiles, (userProfile, key) => (
              userProfile.type !== NPC_TYPE ? null : <ProfileTile
                key={`${userProfile.displayName}-Collab-${key}`}
                profile={userProfile}
                onDelete={() => this.deleteProfile(key)}
                showDelete={this.getDeleteVisible(key)}
              />
            ))}
        </ul>
      </div>
    );
  }
}

ProfileList.contextTypes = {
  router: PropTypes.object.isRequired,
};

ProfileList.propTypes = {
  firebase: firebaseShape.isRequired,
  auth: authShape,
  profile: profileShape,
  profiles: PropTypes.arrayOf(profileShape),
  toggleNewProfileModal: PropTypes.func.isRequired,
  newProfileModal: PropTypes.bool.isRequired,
  children,
};

ProfileList.defaultProps = {
  auth: null,
  profile: null,
  profiles: [],
  children: null,
};

export default compose(
  firebaseConnect([{ path: 'profiles', populates }]),
  connect(
    ({
      firebase: { auth, profile, data: { users, profiles } },
      modal,
    }) => ({
      auth,
      profile,
      newProfileModal: modal.newProfile,
      profiles: map(profiles || [], (profileItem, uid) => ({
        ...profileItem,
        uid,
        createdBy: !users
          ? uid
          : {
            ...users[profileItem.createdBy],
            uid: profileItem.createdBy,
          },
      })).reverse(),
    }),
    // map dispatch to props
    dispatch => ({
      toggleNewProfileModal: toggleNewProfileModal(dispatch),
    }),
  ),
  UserIsAuthenticated,
)(ProfileList);
