import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import ProgressIndicator from 'components/ProgressIndicator'
import classes from './index.scss'

// Get profile path from firebase based on params prop (route params from react-router)
@firebaseConnect(({ params: { profilename } }) => [`profiles/${profilename}`])
// Map state to props
@connect(({ firebase: { data } }, { params: { profilename } }) => ({
  profile: data.profiles && data.profiles[profilename]
  // profile: get(data, `profiles.${profilename}`) // lodash's get can be used for convience
}))
export default class Profile extends Component {
  static propTypes = {
    profile: PropTypes.object,
    params: PropTypes.object.isRequired
  }

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
        <h2>Profile Container</h2>
        <pre>Profile Key: {params.profilename}</pre>
        <pre>{JSON.stringify(profile, null, 2)}</pre>
      </div>
    )
  }
}
