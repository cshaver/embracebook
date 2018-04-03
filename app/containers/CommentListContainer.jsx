import React from 'react';
import PropTypes from 'prop-types';
import { withFirebase } from 'react-redux-firebase';
import { compose } from 'recompose';

import { withStyles, withStylesPropTypes } from '../components/utils/withStyles';
import firebaseShape, { auth as authShape } from '../shapes/firebase';
import postShape from '../shapes/post';
import profileShape from '../shapes/profile';
import { withAuth } from '../utils/components';

import NewCommentForm from '../components/NewCommentForm';
import Comment from '../components/Comment';

const propTypes = {
  ...withStylesPropTypes,
  firebase: firebaseShape.isRequired,
  auth: authShape,
  post: postShape.isRequired,
  user: PropTypes.string.isRequired,
  hasAuthorConfig: PropTypes.bool.isRequired,
  authorProfiles: PropTypes.arrayOf(profileShape),
};

const defaultProps = {
  authorProfiles: [],
  auth: null,
};

class CommentList extends React.Component {
  constructor() {
    super();

    this.newComment = this.newComment.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
  }

  getDeleteVisible(comment) {
    const { auth } = this.props;
    return !!(
      comment &&
      comment.createdBy === auth.uid
    );
  }

  newComment(comment) {
    const {
      firebase,
      post,
      user,
      auth,
    } = this.props;

    return firebase
      .push(`posts/${post.uid}/comments`, {
        author: user,
        ...comment,
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

  render() {
    const {
      css, post, post: { comments }, hasAuthorConfig, authorProfiles, styles,
    } = this.props;

    return (
      <div>
        <ul {...css(styles.list)}>
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
          form={`newComment-${post.uid}`}
          hasAuthorConfig={hasAuthorConfig}
          authorProfiles={authorProfiles}
          onSubmit={this.newComment}
        />
      </div>
    );
  }
}

CommentList.propTypes = propTypes;
CommentList.defaultProps = defaultProps;

export default compose(
  withStyles(() => ({
    list: {
      margin: 0,
      listStyle: 'none',
    },

    listItem: {
      padding: 0,

      ':before': {
        content: '>',
        display: 'inline',
      },
    },
  })),
  withFirebase,
  withAuth,
)(CommentList);
