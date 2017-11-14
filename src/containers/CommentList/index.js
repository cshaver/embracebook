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

import NewCommentForm from './components/NewCommentForm'

@firebaseConnect()
export default class CommentList extends Component {

  newSubmit = newComment => {
    // newComment.createdBy = this.props.auth.uid
    // unix seconds, instead of milliseconds
    newComment.timestamp = (new Date()).getTime() / 1000
    newComment.author = newComment.author || this.props.user

    return this.props.firebase
      .push(`posts/${this.props.post.uid}/comments`, newComment)
      .catch(err => {
        // TODO: Show Snackbar
        console.error('error creating new post', err) // eslint-disable-line
      })
  }

  resetForm = (result, dispatch, formProps) => {
    formProps.reset()
  }

  render() {
    const { profiles, post, post: { comments } } = this.props

    return (
      <div>
        <ul>
          {comments.map(comment => (
            <li key={comment.uid}>
              <b>{comment.author.displayName}:</b> {comment.content}
            </li>
          ))}
        </ul>
        <NewCommentForm
          profiles={profiles}
          form={`newComment-${post.uid}`}
          onSubmit={this.newSubmit}
          onSubmitSuccess={this.resetForm}
        />
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
