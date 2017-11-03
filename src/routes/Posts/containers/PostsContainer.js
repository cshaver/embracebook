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

import { POST_LIST_PATH } from 'constants'
import { UserIsAuthenticated } from 'utils/router'
import LoadingSpinner from 'components/LoadingSpinner'
import PostTile from '../components/PostTile'
import NewPostTile from '../components/NewPostTile'
import NewPostDialog from '../components/NewPostDialog'
import { toggleNewPostModal } from '../actions'

// import { VerboseLogging } from 'utils/logging'

import classes from './PostsContainer.scss'

const populates = [
  { child: 'createdBy', root: 'users', keyProp: 'uid' },
  { child: 'author', root: 'profiles', keyProp: 'uid' }
]

@UserIsAuthenticated
@firebaseConnect([
  { path: 'posts', populates }
])
@connect(
  // map state to props
  ({ firebase, firebase: { auth, data: { posts } }, form: { newPost } }, { params }) => (
    {
      auth,
      newPostModal: newPost,
      posts: populate(firebase, 'posts', populates)
    }
  ),
  // map dispatch to props
  dispatch => ({
    toggleNewPostModal: toggleNewPostModal(dispatch)
  })
)
// @VerboseLogging
export default class Posts extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  newSubmit = newPost => {
    newPost.createdBy = this.props.auth.uid

    return this.props.firebase
      .push('posts', newPost)
      .then(() => this.toggleModal(false))
      .catch(err => {
        // TODO: Show Snackbar
        console.error('error creating new post', err) // eslint-disable-line
      })
  }

  deletePost = key => this.props.firebase.remove(`posts/${key}`)

  toggleModal = (open) => {
    this.props.toggleNewPostModal({
      open,
      initialValues: {
        avatarUrl: 'https://api.adorable.io/avatars/default.png'
      }
    })
  }

  getDeleteVisible = key => {
    const { auth, posts } = this.props
    return (
      !isEmpty(this.props.auth) &&
      posts[key] &&
      posts[key].createdBy.uid === auth.uid
    )
  }

  render() {
    const { posts, auth, newPostModal } = this.props

    if (!isLoaded(posts, auth)) {
      return <LoadingSpinner />
    }

    // Post Route is being loaded
    if (this.props.children) {
      // pass all props to children routes
      return cloneElement(this.props.children, this.props)
    }

    return (
      <div className={classes.container}>
        {newPostModal && (
          <NewPostDialog
            open={!!newPostModal}
            onSubmit={this.newSubmit}
            onRequestClose={() => this.toggleModal(false)}
          />
        )}
        <div className={classes.tiles}>
          <NewPostTile onClick={() => this.toggleModal(true)} />
          {!isEmpty(posts) &&
            map(posts, (post, key) => (
              <PostTile
                key={`${post.createdBy}-Collab-${key}`}
                post={post}
                onCollabClick={this.collabClick}
                onSelect={() => this.context.router.push(`${POST_LIST_PATH}/${key}`)}
                onDelete={() => this.deletePost(key)}
                showDelete={this.getDeleteVisible(key)}
              />
            ))}
        </div>
      </div>
    )
  }

  static propTypes = {
    children: PropTypes.object,
    firebase: PropTypes.object.isRequired,
    posts: PropTypes.object,
    auth: PropTypes.object
  }
}
