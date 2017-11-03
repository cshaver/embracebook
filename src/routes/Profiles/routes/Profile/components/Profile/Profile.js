import React from 'react'
import PropTypes from 'prop-types'
import classes from './Profile.scss'

export const Profile = ({ profiles, params: { profilename } }) => (
  <div className={classes.container}>
    {profiles[profilename] ? (
      <div>
        <h2>Profile Container</h2>
        <pre>{JSON.stringify(profiles[profilename], null, 2)}</pre>
      </div>
    ) : (
      <div className={classes.empty}>
        <span>Profile Not Found</span>
      </div>
    )}
  </div>
)

Profile.propTypes = {
  profiles: PropTypes.object,
  params: PropTypes.object.isRequired
}

export default Profile
