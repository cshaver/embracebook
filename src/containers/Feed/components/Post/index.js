import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { isObject } from 'lodash'
import moment from 'moment'

import CommentsContainer from 'containers/Comments'
import DeleteButton from 'components/Form/DeleteButton'
import ProfileLink from 'components/ProfileLink'

import classes from './index.scss'

export const Post = ({ post, onDelete, showDelete, profiles, user }) => (
  <blockquote className={classes.container}>
    <div className={classes.top}>
      <ProfileLink profile={post.author} />
      &nbsp;
      <i>{post.timestamp ? moment.unix(post.timestamp).fromNow() : ''}</i>
      <p>{post.content}</p>
      <DeleteButton showDelete={showDelete} onDelete={onDelete} />
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
