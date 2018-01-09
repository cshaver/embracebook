import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import { connect } from 'react-redux';
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
} from 'react-redux-firebase';

import ProgressIndicator from 'embracebook/components/ProgressIndicator';
import { PLAYER_TYPE } from 'embracebook/constants';
import { UserIsAuthenticated } from 'embracebook/utils/auth';

import children from 'embracebook/shapes/children';
import profileShape from 'embracebook/shapes/profile';
import firebaseShape, { auth as authShape } from 'embracebook/shapes/firebase';

import Post from './components/Post';
import NewPostForm from './components/NewPostForm';

const populates = [
  { child: 'author', root: 'profiles', keyProp: 'uid' },
];

class Feed extends React.Component {
  getDeleteVisible(post) {
    const { auth } = this.props;
    return (
      !isEmpty(this.props.auth) &&
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
    return this.props.profile.type !== PLAYER_TYPE;
  }

  render() {
    const {
      posts, auth,
    } = this.props;

    console.groupCollapsed('Feed::render');
    console.table(posts);
    console.groupEnd();

    if (!isLoaded(posts, auth)) {
      return <ProgressIndicator />;
    }

    // Post Route is being loaded
    if (this.props.children) {
      // pass all props to children routes
      return React.cloneElement(this.props.children, this.props);
    }

    return (
      <div>
        <NewPostForm onSubmit={this.newSubmit} hasAuthorConfig={this.hasAuthorConfig()} />
        {!isEmpty(posts) &&
          posts.map(post => (
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

Feed.contextTypes = {
  router: PropTypes.object.isRequired,
};

Feed.propTypes = {
  firebase: firebaseShape.isRequired,
  auth: authShape,
  profile: profileShape.isRequired,
  posts: children,
  children,
};

Feed.defaultProps = {
  auth: null,
  posts: null,
  children: null,
};

export default compose(
  firebaseConnect([
    { path: 'posts', keyProp: 'uid', populates },
  ]),
  connect(({
    firebase,
    firebase: { auth, profile, data: { profiles, posts } }, form: { newPost },
  }) => (
    {
      firebase,
      auth,
      profile,
      profiles,
      newPostModal: newPost,
      // posts: populate(firebase, 'posts', populates)
      posts: posts ? map(posts, (post, uid) => ({
        ...post,
        uid,
        author: {
          ...profiles[post.author],
          uid: post.author,
        },
        comments: map(post.comments, (comment, uid) => ({
          ...comment,
          uid,
          author: profiles[comment.author],
        })),
      })) : [],
    }
  )),
  UserIsAuthenticated,
)(Feed);
