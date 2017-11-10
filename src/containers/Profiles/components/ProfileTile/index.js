import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import Paper from 'material-ui/Paper'
import { isObject } from 'lodash'
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import classes from './index.scss'

export const ProfileTile = ({ profile, onSelect, onDelete, showDelete }) => (
  <Paper className={classes.container}>
    <div className={classes.top}>
      <Link to={`/profile/${profile.uid}/${profile.slug}`}>
        {profile.displayName}
      </Link>
      {showDelete && onDelete ? (
        <IconButton tooltip="delete" onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      ) : null}
    </div>
    <span className={classes.owner}>
      {isObject(profile.createdBy)
        ? profile.createdBy.displayName
        : profile.createdBy || 'No Owner'}
    </span>
  </Paper>
)

ProfileTile.propTypes = {
  profile: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  showDelete: PropTypes.bool
}

export default ProfileTile
