import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { map, get } from 'lodash';
import { connect } from 'react-redux';
import {
  firebaseConnect,
  populate,
  isLoaded,
  isEmpty,
} from 'react-redux-firebase';

import { FEED_PATH, PLAYER_TYPE } from 'constants';
import ProgressIndicator from 'components/ProgressIndicator';
import Post from './components/Post';
import NewPostForm from './components/NewPostForm';

const populates = [
  { child: 'author', root: 'profiles', keyProp: 'uid' },
];

class Feed extends React.Component {
  newSubmit(newPost) {
    // set author for players
    newPost.author = newPost.author || this.props.auth.uid;
    // always set createdBy
    newPost.createdBy = this.props.auth.uid;
    // unix seconds, instead of milliseconds
    newPost.timestamp = (new Date()).getTime() / 1000;

    return this.props.firebase
      .push('posts', newPost)
      .catch((err) => {
        // TODO: Show Snackbar
        console.error('error creating new post', err) // eslint-disable-line
      });
  }

  deletePost(key) {
    return this.props.firebase.remove(`posts/${key}`);
  }

  getDeleteVisible(post) {
    const { auth } = this.props;
    return (
      !isEmpty(this.props.auth) &&
      post &&
      post.createdBy === auth.uid
    );
  }

  hasAuthorConfig() {
    return this.props.profile.type !== PLAYER_TYPE;
  }

  render() {
    const {
      posts, auth, newPostModal, profiles,
    } = this.props;

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
      </div>
    );
  }
}

Feed.contextTypes = {
  router: PropTypes.object.isRequired,
};

Feed.propTypes = {
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

Feed.defaultProps = {
  children: null,
};

export default compose(
  firebaseConnect([
    { path: 'posts', keyProp: 'uid', /* queryParams: ['orderByChild=timestamp'], */ populates },
  ]),
  connect(
    // map state to props
    ({ firebase, firebase: { auth, profile, data: { /* users, */ profiles, posts } /* , ordered: { posts } */ }, form: { newPost } }, { params }) => (
      {
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
        // posts: posts ? posts.map(({ key, value }) => ({ ...value, uid, createdBy: users[value.createdBy], author: profiles[value.author] })) : []
      }
    )),
)(Feed);
