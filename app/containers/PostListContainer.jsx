import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import Post from 'embracebook/components/Post';
import NewPostForm from 'embracebook/components/NewPostForm';
import { UserIsAuthenticated } from 'embracebook/utils/auth';
import { withFirebase, withRoles } from 'embracebook/utils/components';

import postShape from 'embracebook/shapes/post';
import profileShape, { roles as rolesShape } from 'embracebook/shapes/profile';
import firebaseShape, { auth as authShape } from 'embracebook/shapes/firebase';

import withPosts from 'embracebook/components/withPosts';

const propTypes = {
  firebase: firebaseShape.isRequired,
  auth: authShape,
  roles: rolesShape,
  posts: PropTypes.arrayOf(postShape),
  profiles: PropTypes.arrayOf(profileShape),
};

const defaultProps = {
  auth: null,
  roles: {},
  posts: [],
  profiles: [],
};

const contextTypes = {
  router: PropTypes.object.isRequired,
};

class PostListContainer extends React.Component {
  constructor() {
    super();

    this.deletePost = this.deletePost.bind(this);
    this.newPost = this.newPost.bind(this);
  }

  getDeleteVisible(post) {
    const { auth } = this.props;
    return !!(
      post &&
      post.createdBy === auth.uid
    );
  }

  getAuthorProfiles() {
    const { profiles } = this.props;
    return this.hasAuthorConfig() && profiles;
  }

  hasAuthorConfig() {
    const { roles } = this.props;
    return roles.storyteller || roles.admin;
  }

  newPost(post) {
    const { firebase, auth } = this.props;
    return firebase.push('posts', {
      author: auth.uid,
      ...post,
      timestamp: (new Date()).toISOString(),
      createdBy: auth.uid,
    })
      .then(() => {
        console.log('successfully created post');
      })
      .catch((err) => {
        console.error('error creating new post', err);
      });
  }

  deletePost(uid) {
    const { firebase } = this.props;
    return firebase.remove(`posts/${uid}`)
      .then(() => {
        console.log('successfully deleted post');
      })
      .catch((err) => {
        console.error('error deleting post', err);
      });
  }

  render() {
    const {
      posts, auth,
    } = this.props;

    return (
      <div>
        <NewPostForm
          onSubmit={this.newPost}
          hasAuthorConfig={!!this.hasAuthorConfig()}
          authorProfiles={this.getAuthorProfiles()}
        />
        {posts && posts.map(post => (
          <Post
            key={post.uid}
            post={post}
            user={auth.uid}
            hasAuthorConfig={this.hasAuthorConfig()}
            authorProfiles={this.getAuthorProfiles()}
            onDelete={this.deletePost}
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
)(PostListContainer);
