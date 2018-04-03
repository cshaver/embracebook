import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';

import ProgressIndicator from '../components/ProgressIndicator';
// import { NPC_TYPE } from '../constants';
import { userIsStoryteller } from '../utils/components';

import children from '../shapes/children';
import profileShape from '../shapes/profile';
import firebaseShape, { auth as authShape } from '../shapes/firebase';

import ProfileTile from '../components/ProfileTile';
import NewProfileTile from '../components/NewProfileTile';
import NewProfileDialog from '../components/NewProfileDialog';

const populates = [{ child: 'createdBy', root: 'users', keyProp: 'uid' }];

const contextTypes = {
  router: PropTypes.object.isRequired,
};

const propTypes = {
  firebase: firebaseShape.isRequired,
  auth: authShape,
  profiles: PropTypes.arrayOf(profileShape),
  children,
};

const defaultProps = {
  auth: null,
  profiles: [],
  children: null,
};

class NPCList extends React.Component {
  constructor() {
    super();

    this.state = {
      modalOpen: false,
    };

    this.newSubmit = this.newSubmit.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  getDeleteVisible(key) {
    const { auth, profiles } = this.props;
    return (
      !isEmpty(this.props.auth) &&
      profiles[key] &&
      profiles[key].createdBy.uid === auth.uid
    );
  }

  openModal() {
    this.setState({ modalOpen: true });
  }

  closeModal() {
    this.setState({ modalOpen: false });
  }

  deleteProfile(key) {
    const { profiles, firebase } = this.props;
    firebase.remove(`profiles/${profiles[key].uid}`);
  }

  newSubmit(newProfile) {
    const { auth, firebase } = this.props;
    newProfile.createdBy = auth.uid;
    // newProfile.type = NPC_TYPE;

    return firebase.push('profiles', newProfile)
      .then(this.closeModal)
      .catch((err) => {
        console.error('error creating new profile', err) // eslint-disable-line
      });
  }

  render() {
    const { profiles, auth } = this.props;
    const { modalOpen } = this.state;

    if (!isLoaded(profiles, auth)) {
      return <ProgressIndicator />;
    }

    // Profile Route is being loaded
    if (this.props.children) {
      // pass all props to children routes
      return React.cloneElement(this.props.children, this.props);
    }

    return (
      <div>
        {modalOpen && (
          <NewProfileDialog
            open={modalOpen}
            onSubmit={this.newSubmit}
            onRequestClose={this.closeModal}
            initialValues={{
              avatarUrl: 'https://api.adorable.io/avatars/default.png',
            }}
          />
        )}
        <ul>
          <NewProfileTile onClick={this.openModal} />
          {/* TODO: test for NPC-type profile */}
          {map(profiles, (userProfile, key) => (
            <ProfileTile
              key={key}
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

NPCList.contextTypes = contextTypes;
NPCList.propTypes = propTypes;
NPCList.defaultProps = defaultProps;

export default compose(
  firebaseConnect([{ path: 'profiles', populates }]),
  connect(({ firebase: { auth, data: { users, profiles } } }) => ({
    auth,
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
  })),
  userIsStoryteller,
)(NPCList);
