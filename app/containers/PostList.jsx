import React from 'react';
import PropTypes from 'prop-types';
// import { compose } from 'recompose';

// import { graphql } from 'react-apollo';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import NewPostForm from './NewPostForm';
import Post from '../components/Post';
// import { UserIsAuthenticated } from '../utils/auth';
// import { withFirebase, withRoles } from '../utils/components';

// import postShape from '../shapes/post';
// import profileShape, { roles as rolesShape } from '../shapes/profile';
// import firebaseShape, { auth as authShape } from '../shapes/firebase';

// import withPosts from '../components/withPosts';

const propTypes = {
  // firebase: firebaseShape.isRequired,
  // auth: authShape,
  // roles: rolesShape,
  // posts: PropTypes.arrayOf(postShape),
  // profiles: PropTypes.arrayOf(profileShape),
};

const defaultProps = {
  // auth: null,
  // roles: {},
  // posts: [],
  // profiles: [],
};

const contextTypes = {
  router: PropTypes.object.isRequired,
};

const ALL_POSTS_QUERY = gql`
  query AllPostsQuery {
    allPosts(orderBy: createdAt_DESC) {
      id
      content
    }
  }
`;

class PostList extends React.Component {
  constructor() {
    super();

    this.deletePost = this.deletePost.bind(this);
    this.newPost = this.newPost.bind(this);
  }

  getDeleteVisible(post) {
    return false;
    // const { auth } = this.props;
    // return !!(
    //   post &&
    //   post.createdBy === auth.uid
    // );
  }

  getAuthorProfiles() {
    return [];
    // const { profiles } = this.props;
    // return this.hasAuthorConfig() && profiles;
  }

  hasAuthorConfig() {
    return false;
    // const { roles } = this.props;
    // return roles.storyteller || roles.admin;
  }

  newPost(post) {
    const { firebase, auth } = this.props;
    return firebase.push('posts', {
      // author: auth.uid,
      ...post,
      timestamp: (new Date()).toISOString(),
      // createdBy: auth.uid,
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
    // const {
    //   posts, auth,
    // } = this.props;

    return (
      <Query query={ALL_POSTS_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return `Error!: ${error}`;

          const { allPosts: posts } = data;

          console.log(posts);

          return (
            <div>
              <NewPostForm
                onSubmit={this.newPost}
                hasAuthorConfig={!!this.hasAuthorConfig()}
                authorProfiles={this.getAuthorProfiles()}
              />
              {posts && posts.map(({ content, id }) => (
                <Post
                  key={id}
                  post={content}
                  user={/* auth.uid */ null}
                  hasAuthorConfig={this.hasAuthorConfig()}
                  authorProfiles={this.getAuthorProfiles()}
                  onDelete={this.deletePost}
                  showDelete={this.getDeleteVisible(124)}
                />
              )).reverse()}
            </div>
          );
        }}
      </Query>
    );
  }
}

PostList.propTypes = propTypes;
PostList.defaultProps = defaultProps;
PostList.contextTypes = contextTypes;

export default PostList;

// export default graphql(ALL_POSTS_QUERY, {
//   name: 'allPostsQuery',
//   options: {
//     fetchPolicy: 'network-only',
//   },
// })(PostList);

// export default compose(
//   // UserIsAuthenticated,
//   // withFirebase,
//   // withRoles,
//   // withPosts,
// )(PostList);
