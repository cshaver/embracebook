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
// import { UserIsAuthenticated } from 'utils/router'
import LoadingSpinner from 'components/LoadingSpinner'
import PostTile from '../components/PostTile'
import NewPostTile from '../components/NewPostTile'
import NewPostDialog from '../components/NewPostDialog'
import classes from './PostsContainer.scss'

const populates = [{ child: 'createdBy', root: 'users' }]

// @UserIsAuthenticated
@firebaseConnect([
  { path: 'posts', populates }
  // 'posts#populate=owner:users' // string equivalent
])
@connect(
  ({ firebase, firebase: { auth, data: { posts } } }, { params }) => ({
    auth,
    posts: populate(firebase, 'posts', populates)
  })
)
export default class Posts extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  static propTypes = {
    children: PropTypes.object,
    firebase: PropTypes.object.isRequired,
    posts: PropTypes.object,
    unpopulatedPosts: PropTypes.object,
    auth: PropTypes.object
  }

  state = {
    newPostModal: false
  }

  newSubmit = newPost => {
    return this.props.firebase
      .push('posts', newPost)
      .then(() => this.setState({ newPostModal: false }))
      .catch(err => {
        // TODO: Show Snackbar
        console.error('error creating new post', err) // eslint-disable-line
      })
  }

  deletePost = key => this.props.firebase.remove(`posts/${key}`)

  toggleModal = (name, post) => {
    let newState = {}
    newState[`${name}Modal`] = !this.state[`${name}Modal`]
    this.setState(newState)
  }

  getDeleteVisible = key => {
    const { auth, unpopulatedPosts } = this.props
    return (
      !isEmpty(this.props.auth) &&
      get(unpopulatedPosts, `${key}.createdBy`) === auth.uid
    )
  }

  render() {
    const { posts, auth } = this.props
    const { newPostModal } = this.state

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
            open={newPostModal}
            onSubmit={this.newSubmit}
            onRequestClose={() => this.toggleModal('newPost')}
          />
        )}
        <div className={classes.tiles}>
          <NewPostTile onClick={() => this.toggleModal('newPost')} />
          {!isEmpty(posts) &&
            map(posts, (post, key) => (
              <PostTile
                key={`${post.name}-Collab-${key}`}
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
}
