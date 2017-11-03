import React from 'react'
import PropTypes from 'prop-types'
import classes from './Post.scss'

export const Post = ({ posts, params: { postname } }) => (
  <div className={classes.container}>
    {posts[postname] ? (
      <div>
        <h2>Post Container</h2>
        <pre>{JSON.stringify(posts[postname], null, 2)}</pre>
      </div>
    ) : (
      <div className={classes.empty}>
        <span>Post Not Found</span>
      </div>
    )}
  </div>
)

Post.propTypes = {
  posts: PropTypes.object,
  params: PropTypes.object.isRequired
}

export default Post
