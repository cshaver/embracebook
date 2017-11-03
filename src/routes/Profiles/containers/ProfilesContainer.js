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
// import { UserIsAuthenticated } from 'utils/router'
import LoadingSpinner from 'components/LoadingSpinner'
import ProfileTile from '../components/ProfileTile'
import NewProfileTile from '../components/NewProfileTile'
import NewProfileDialog from '../components/NewProfileDialog'
import classes from './ProfilesContainer.scss'

const populates = [{ child: 'createdBy', root: 'users' }]

// @UserIsAuthenticated
@firebaseConnect([
  { path: 'profiles', populates }
  // 'profiles#populate=owner:users' // string equivalent
])
@connect(
  ({ firebase, firebase: { auth, data: { profiles } } }, { params }) => ({
    auth,
    profiles: populate(firebase, 'profiles', populates)
  })
)
export default class Profiles extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  static propTypes = {
    children: PropTypes.object,
    firebase: PropTypes.object.isRequired,
    profiles: PropTypes.object,
    unpopulatedProfiles: PropTypes.object,
    auth: PropTypes.object
  }

  state = {
    newProfileModal: false
  }

  newSubmit = newProfile => {
    return this.props.firebase
      .push('profiles', newProfile)
      .then(() => this.setState({ newProfileModal: false }))
      .catch(err => {
        // TODO: Show Snackbar
        console.error('error creating new profile', err) // eslint-disable-line
      })
  }

  deleteProfile = key => this.props.firebase.remove(`profiles/${key}`)

  toggleModal = (name, profile) => {
    let newState = {}
    newState[`${name}Modal`] = !this.state[`${name}Modal`]
    this.setState(newState)
  }

  getDeleteVisible = key => {
    const { auth, unpopulatedProfiles } = this.props
    return (
      !isEmpty(this.props.auth) &&
      get(unpopulatedProfiles, `${key}.createdBy`) === auth.uid
    )
  }

  render() {
    const { profiles, auth } = this.props
    const { newProfileModal } = this.state

    if (!isLoaded(profiles, auth)) {
      return <LoadingSpinner />
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
            open={newProfileModal}
            onSubmit={this.newSubmit}
            onRequestClose={() => this.toggleModal('newProfile')}
          />
        )}
        <div className={classes.tiles}>
          <NewProfileTile onClick={() => this.toggleModal('newProfile')} />
          {!isEmpty(profiles) &&
            map(profiles, (profile, key) => (
              <ProfileTile
                key={`${profile.name}-Collab-${key}`}
                profile={profile}
                onCollabClick={this.collabClick}
                onSelect={() => this.context.router.push(`${PROFILE_LIST_PATH}/${key}`)}
                onDelete={() => this.deleteProfile(key)}
                showDelete={this.getDeleteVisible(key)}
              />
            ))}
        </div>
      </div>
    )
  }
}
