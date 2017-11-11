import React, { Component, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { map, get } from 'lodash'
import { connect } from 'react-redux'
import {
  firebaseConnect,
  populate,
  isLoaded,
  isEmpty
} from 'react-redux-firebase'

import { PROFILE_LIST_PATH } from 'constants'
import { UserIsAuthenticated } from 'utils/router'
import ProgressIndicator from 'components/ProgressIndicator'
import ProfileTile from './components/ProfileTile'
import NewProfileTile from './components/NewProfileTile'
import NewProfileDialog from './components/NewProfileDialog'
import { toggleNewProfileModal } from './actions'

import classes from './index.scss'

const populates = [{ child: 'createdBy', root: 'users', keyProp: 'uid' }]

@UserIsAuthenticated
@firebaseConnect([
  { path: 'profiles', populates }
])
@connect(
  // map state to props
  ({ firebase, firebase: { auth, data: { users, profiles } }, form: { newProfile } }, { params }) => (
    {
      auth,
      newProfileModal: newProfile,
      profiles: map((profiles || []), (profile, uid) => ({
        ...profile,
        uid,
        createdBy: !users ? uid : {
          ...users[profile.createdBy],
          uid: profile.createdBy
        }
      })).reverse()
    }
  ),
  // map dispatch to props
  dispatch => ({
    toggleNewProfileModal: toggleNewProfileModal(dispatch)
  })
)
export default class Profiles extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  newSubmit = newProfile => {
    newProfile.createdBy = this.props.auth.uid

    return this.props.firebase
      .push('profiles', newProfile)
      .then(() => this.toggleModal(false))
      .catch(err => {
        // TODO: Show Snackbar
        console.error('error creating new profile', err) // eslint-disable-line
      })
  }

  deleteProfile = key => this.props.firebase.remove(`profiles/${key}`)

  toggleModal = (open) => {
    this.props.toggleNewProfileModal({
      open,
      initialValues: {
        avatarUrl: 'https://api.adorable.io/avatars/default.png'
      }
    })
  }

  getDeleteVisible = key => {
    const { auth, profiles } = this.props
    return (
      !isEmpty(this.props.auth) &&
      profiles[key] &&
      profiles[key].createdBy.uid === auth.uid
    )
  }

  render() {
    const { profiles, auth, newProfileModal } = this.props

    if (!isLoaded(profiles, auth)) {
      return <ProgressIndicator />
    }

    // Profile Route is being loaded
    if (this.props.children) {
      // pass all props to children routes
      return cloneElement(this.props.children, this.props)
    }

    return (
      <div className={classes.container}>
        {newProfileModal && (
          <NewProfileDialog
            open={!!newProfileModal}
            onSubmit={this.newSubmit}
            onRequestClose={() => this.toggleModal(false)}
          />
        )}
        <ul className={classes.tiles}>
          <NewProfileTile onClick={() => this.toggleModal(true)} />
          {!isEmpty(profiles) &&
            map(profiles, (profile, key) => (
              <ProfileTile
                key={`${profile.displayName}-Collab-${key}`}
                profile={profile}
                onDelete={() => this.deleteProfile(key)}
                showDelete={this.getDeleteVisible(key)}
              />
            ))}
        </ul>
      </div>
    )
  }

  static propTypes = {
    children: PropTypes.object,
    firebase: PropTypes.object.isRequired,
    auth: PropTypes.object
  }
}
