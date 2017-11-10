import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { isObject } from 'lodash'
import moment from 'moment'

import CommentsContainer from 'containers/Comments'

import classes from './index.scss'

export const Post = ({ post, onDelete, showDelete, profiles, user }) => (
  <blockquote className={classes.container}>
    <div className={classes.top}>
      <Link to={`/profile/${post.author.uid}/${post.author.slug}`}>
        <b className={classes.owner}>
          {isObject(post.author)
            ? post.author.displayName
            : post.author || 'No Owner'}
        </b>
      </Link>
      &nbsp;
      <i className={classes.owner}>
        {post.timestamp
          ? moment.unix(post.timestamp).fromNow()
          : ''
        }
      </i>
      <p className={classes.name}>
        {post.content}
      </p>
      {showDelete && onDelete ? (
        <button onClick={onDelete}>Delete</button>
      ) : null}
    </div>
    <CommentsContainer profiles={profiles} post={post} user={user} />
  </blockquote>
)

Post.propTypes = {
  post: PropTypes.object.isRequired,
  onDelete: PropTypes.func,
  showDelete: PropTypes.bool
}

export default Post
