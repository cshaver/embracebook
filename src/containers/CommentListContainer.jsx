import React from 'react';
import PropTypes from 'prop-types';
import { withFirebase } from 'react-redux-firebase';
import { compose } from 'recompose';

import firebaseShape, { auth as authShape } from 'embracebook/shapes/firebase';
import postShape from 'embracebook/shapes/post';
import profileShape from 'embracebook/shapes/profile';
import { withAuth } from 'embracebook/utils/components';

import NewCommentForm from 'embracebook/components/NewCommentForm';
import Comment from 'embracebook/components/Comment';

const propTypes = {
  firebase: firebaseShape.isRequired,
  auth: authShape,
  post: postShape.isRequired,
  user: PropTypes.string.isRequired,
  profiles: PropTypes.arrayOf(profileShape),
  hasAuthorConfig: PropTypes.bool.isRequired,
};

const defaultProps = {
  profiles: [],
  auth: null,
};

class CommentList extends React.Component {
  constructor() {
    super();

    this.newSubmit = this.newSubmit.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
  }

  getDeleteVisible(comment) {
    const { auth } = this.props;
    return !!(
      comment &&
      comment.createdBy === auth.uid
    );
  }

  newSubmit(newComment) {
    const {
      firebase,
      post,
      user,
      auth,
    } = this.props;

    return firebase
      .push(`posts/${post.uid}/comments`, {
        author: user,
        ...newComment,
        timestamp: (new Date()).toISOString(),
        createdBy: auth.uid,
      })
      .then(() => {
        console.log('successfully created comment');
      })
      .catch((err) => {
        console.error('error creating comment', err);
      });
  }

  deleteComment(uid) {
    const { firebase, post } = this.props;
    return firebase.remove(`posts/${post.uid}/comments/${uid}`)
      .then(() => {
        console.log('successfully deleted comment');
      })
      .catch((err) => {
        console.error('error deleting comment', err);
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
              <Comment
                comment={comment}
                showDelete={this.getDeleteVisible(comment)}
                onDelete={this.deleteComment}
              />
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

CommentList.propTypes = propTypes;
CommentList.defaultProps = defaultProps;

export default compose(
  withFirebase,
  withAuth,
)(CommentList);
