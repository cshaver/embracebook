import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { firebaseConnect } from 'react-redux-firebase';

import firebaseShape from 'embracebook/shapes/firebase';
import postShape from 'embracebook/shapes/post';
import userShape from 'embracebook/shapes/user';
import profileShape from 'embracebook/shapes/profile';

import NewCommentForm from './components/NewCommentForm';

class CommentList extends React.Component {
  newSubmit(newComment) {
    const { firebase, post, user } = this.props;
    // newComment.createdBy = this.props.auth.uid
    // unix seconds, instead of milliseconds
    newComment.timestamp = (new Date()).getTime() / 1000;
    newComment.author = newComment.author || user;

    return firebase
      .push(`posts/${post.uid}/comments`, newComment)
      .catch((err) => {
        // TODO: Show Snackbar
        console.error('error creating new post', err) // eslint-disable-line
      });
  }

  resetForm(result, dispatch, formProps) { // eslint-disable-line class-methods-use-this
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
  firebase: firebaseShape.isRequired,
  post: postShape.isRequired,
  user: userShape.isRequired,
  profiles: PropTypes.arrayOf(profileShape),
  hasAuthorConfig: PropTypes.bool,
};

CommentList.defaultProps = {
  profiles: [],
  hasAuthorConfig: false,
};

export default compose(firebaseConnect())(CommentList);
