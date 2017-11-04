import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import LoadingSpinner from 'components/LoadingSpinner'
import classes from './PostContainer.scss'

// Get post path from firebase based on params prop (route params from react-router)
@firebaseConnect(({ params: { postname } }) => [`posts/${postname}`])
// Map state to props
@connect(({ firebase: { data } }, { params: { postname } }) => ({
  post: data.posts && data.posts[postname]
  // post: get(data, `posts.${postname}`) // lodash's get can be used for convience
}))
export default class Post extends Component {
  static propTypes = {
    post: PropTypes.object,
    params: PropTypes.object.isRequired
  }

  render() {
    const { post, params } = this.props

    if (isEmpty(post)) {
      return <div>Post not found</div>
    }

    if (!isLoaded(post)) {
      return <LoadingSpinner />
    }

    return (
      <div className={classes.container}>
        <h2>Post Container</h2>
        <pre>Post Key: {params.postname}</pre>
        <pre>{JSON.stringify(post, null, 2)}</pre>
      </div>
    )
  }
}
