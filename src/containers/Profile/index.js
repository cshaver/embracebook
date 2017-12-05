import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import ProgressIndicator from 'components/ProgressIndicator'
import classes from './index.scss'

// Get profile path from firebase based on params prop (route params from react-router)
@firebaseConnect(({ params: { uid } }) => [`profiles/${uid}`])
// Map state to props
@connect(({ firebase: { data } }, { params: { uid } }) => ({
  profile: data.profiles && data.profiles[uid]
  // profile: get(data, `profiles.${uid}`) // lodash's get can be used for convience
}))
export default class Profile extends Component {
  render() {
    const { profile, params } = this.props

    if (isEmpty(profile)) {
      return <div>Profile not found</div>
    }

    if (!isLoaded(profile)) {
      return <ProgressIndicator />
    }

    return (
      <div className={classes.container}>
        <img src={profile.avatarUrl} />
        <h2>{profile.displayName}’s profile</h2>
      </div>
    )
  }
}

Profile.propTypes = {
  profile: PropTypes.object,
  params: PropTypes.object.isRequired
}
