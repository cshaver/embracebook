import React, { Component, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { map, get } from 'lodash'
import { connect } from 'react-redux'
import {
  firebaseConnect,
  populate,
  isLoaded,
  isEmpty
} from 'react-redux-firebase'

import { FEED_PATH } from 'constants'
import { UserIsAuthenticated } from 'utils/router'
import ProgressIndicator from 'components/ProgressIndicator'
import Post from './components/Post'
import NewPostForm from './components/NewPostForm'

import classes from './index.scss'

const populates = [
  { child: 'author', root: 'profiles', keyProp: 'uid' }
]

@UserIsAuthenticated
@firebaseConnect([
  { path: 'posts', keyProp: 'uid', /* queryParams: ['orderByChild=timestamp'], */ populates }
])
@connect(
  // map state to props
  ({ firebase, firebase: { auth, data: { /* users, */ profiles, posts } /*, ordered: { posts } */ }, form: { newPost } }, { params }) => (
    {
      auth,
      profiles,
      newPostModal: newPost,
      // posts: populate(firebase, 'posts', populates)
      posts: posts ? map(posts, (post, uid) => ({
        ...post,
        uid,
        author: {
          ...profiles[post.author],
          uid: post.author
        },
        comments: map(post.comments, (comment, uid) => ({
          ...comment,
          uid,
          author: profiles[comment.author]
        }))
      })) : []
      // posts: posts ? posts.map(({ key, value }) => ({ ...value, uid, createdBy: users[value.createdBy], author: profiles[value.author] })) : []
    }
  )
)
export default class Feed extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  newSubmit = newPost => {
    newPost.createdBy = this.props.auth.uid
    // unix seconds, instead of milliseconds
    newPost.timestamp = (new Date()).getTime() / 1000

    return this.props.firebase
      .push('posts', newPost)
      .catch(err => {
        // TODO: Show Snackbar
        console.error('error creating new post', err) // eslint-disable-line
      })
  }

  deletePost = key => this.props.firebase.remove(`posts/${key}`)

  getDeleteVisible = post => {
    const { auth } = this.props
    return (
      !isEmpty(this.props.auth) &&
      post &&
      post.createdBy === auth.uid
    )
  }

  render() {
    const { posts, auth, newPostModal, profiles } = this.props

    if (!isLoaded(posts, auth)) {
      return <ProgressIndicator />
    }

    // Post Route is being loaded
    if (this.props.children) {
      // pass all props to children routes
      return cloneElement(this.props.children, this.props)
    }

    return (
      <div className={classes.container}>
        <div className={classes.tiles}>
          <NewPostForm onSubmit={this.newSubmit} profiles={profiles} />
          {!isEmpty(posts) &&
            posts.map((post) => (
              <Post
                key={`${post.createdBy}-Collab-${post.uid}`}
                post={post}
                user={auth.uid}
                onDelete={() => this.deletePost(post.uid)}
                showDelete={this.getDeleteVisible(post)}
              />
            )).reverse()}
        </div>
      </div>
    )
  }

  static propTypes = {
    children: PropTypes.object,
    firebase: PropTypes.object.isRequired,
    auth: PropTypes.object,
    posts: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
    ])
  }
}
