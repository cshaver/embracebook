import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import PropTypes from 'prop-types';

import Post from 'embracebook/components/Post';
import NewPostForm from 'embracebook/components/NewPostForm';
import { UserIsAuthenticated } from 'embracebook/utils/auth';
import { withFirebase, withRoles } from 'embracebook/utils/components';

import children from 'embracebook/shapes/children';
import { roles as rolesShape } from 'embracebook/shapes/profile';
import firebaseShape, { auth as authShape } from 'embracebook/shapes/firebase';

import withPosts from 'embracebook/components/withPosts';

const propTypes = {
  firebase: firebaseShape.isRequired,
  auth: authShape,
  roles: rolesShape,
  posts: children,
};

const defaultProps = {
  auth: null,
  roles: {},
  posts: null,
};

const contextTypes = {
  router: PropTypes.object.isRequired,
};

class PostListContainer extends React.Component {
  constructor() {
    super();
    this.deletePost = this.deletePost.bind(this);
    this.newSubmit = this.newSubmit.bind(this);
  }

  getDeleteVisible(post) {
    const { auth } = this.props;
    return (
      post &&
      post.createdBy === auth.uid
    );
  }

  deletePost(key) {
    const { firebase } = this.props;
    return firebase.remove(`posts/${key}`);
  }

  newSubmit(newPost) {
    const { firebase } = this.props;
    return firebase.push('posts', newPost)
      .catch((err) => {
        // TODO: Show Snackbar
        console.error('error creating new post', err) // eslint-disable-line
      });
  }

  hasAuthorConfig() {
    const { roles } = this.props;
    return roles.storyteller || roles.admin;
  }

  render() {
    const {
      posts, auth,
    } = this.props;

    console.groupCollapsed('PostListContainer::render');
    console.table(posts);
    console.groupEnd();

    return (
      <div>
        <NewPostForm onSubmit={this.newSubmit} hasAuthorConfig={this.hasAuthorConfig()} />
        {!posts.map(post => (
          <Post
            key={`${post.createdBy}-Collab-${post.uid}`}
            post={post}
            user={auth.uid}
            hasAuthorConfig={this.hasAuthorConfig()}
            onDelete={() => this.deletePost(post.uid)}
            showDelete={this.getDeleteVisible(post)}
          />
        )).reverse()}
      </div>
    );
  }
}

PostListContainer.propTypes = propTypes;
PostListContainer.defaultProps = defaultProps;
PostListContainer.contextTypes = contextTypes;

export default compose(
  UserIsAuthenticated,
  withFirebase,
  withRoles,
  withPosts,
  connect(({ form: { newPost } }) => ({ newPostModal: newPost })),
)(PostListContainer);
