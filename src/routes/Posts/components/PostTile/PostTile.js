import React from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import { isObject } from 'lodash'
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import classes from './PostTile.scss'

export const PostTile = ({ post, onSelect, onDelete, showDelete }) => (
  <Paper className={classes.container}>
    <div className={classes.top}>
      <span className={classes.name} onClick={() => onSelect(post)}>
        {post.name}
      </span>
      {showDelete && onDelete ? (
        <IconButton tooltip="delete" onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      ) : null}
    </div>
    <span className={classes.owner}>
      {isObject(post.createdBy)
        ? post.createdBy.displayName
        : post.createdBy || 'No Owner'}
    </span>
  </Paper>
)

PostTile.propTypes = {
  post: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  showDelete: PropTypes.bool
}

export default PostTile
