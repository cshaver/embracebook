import React from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import { isObject } from 'lodash'
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import classes from './ProfileTile.scss'

export const ProfileTile = ({ profile, onSelect, onDelete, showDelete }) => (
  <Paper className={classes.container}>
    <div className={classes.top}>
      <span className={classes.name} onClick={() => onSelect(profile)}>
        {profile.displayName}
      </span>
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
