import React, { Component } from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import {
  firebaseConnect,
} from 'react-redux-firebase';

import NewCommentForm from './components/NewCommentForm';

class CommentList extends Component {
  newSubmit(newComment) {
    // newComment.createdBy = this.props.auth.uid
    // unix seconds, instead of milliseconds
    newComment.timestamp = (new Date()).getTime() / 1000;
    newComment.author = newComment.author || this.props.user;

    return this.props.firebase
      .push(`posts/${this.props.post.uid}/comments`, newComment)
      .catch((err) => {
        // TODO: Show Snackbar
        console.error('error creating new post', err) // eslint-disable-line
      });
  }

  resetForm(result, dispatch, formProps) {
    formProps.reset();
  }

  render() {
    const {
      profiles, post, post: { comments }, hasAuthorConfig,
    } = this.props;

    return (
      <div>
        <ul>
          {comments.map(comment => (
            <li key={comment.uid}>
              <b>{comment.author ? comment.author.displayName : ''}:</b> {comment.content}
            </li>
          ))}
        </ul>
        <NewCommentForm
          profiles={profiles}
          form={`newComment-${post.uid}`}
          hasAuthorConfig={hasAuthorConfig}
          onSubmit={this.newSubmit}
          onSubmitSuccess={this.resetForm}
        />
      </div>
    );
  }
}

CommentList.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object,
  posts: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
};

CommentList.defaultProps = {
  children: null,
};

export default compose(firebaseConnect())(CommentList);
