import React from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import { isObject } from 'lodash'
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import moment from 'moment'
import classes from './PostTile.scss'

export const PostTile = ({ post, onSelect, onDelete, showDelete }) => (
  <Paper className={classes.container}>
    <div className={classes.top}>
      <p className={classes.name} onClick={() => onSelect(post)}>
        {post.content}
      </p>
      {showDelete && onDelete ? (
        <IconButton tooltip="delete" onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      ) : null}
    </div>
    <span className={classes.owner}>
      {isObject(post.author)
        ? post.author.displayName
        : post.author || 'No Owner'}
    </span>
    <span className={classes.owner}>
      {post.timestamp
        ? moment.unix(post.timestamp).fromNow()
        : ''
      }
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
