import { connect } from 'react-redux';
import { compose } from 'recompose';
import { firebaseConnect } from 'react-redux-firebase';
import { map } from 'lodash';

const withPosts = compose(
  firebaseConnect([
    'posts',
    'profiles',
    'users',
  ]),
  connect(({
    firebase: { data: { profiles, posts, users } },
  }) => {
    const authors = {
      ...users,
      ...profiles,
    };

    return {
      profiles: profiles && Object.keys(profiles).map(uuid => ({ ...profiles[uuid], uuid })),
      posts: profiles && users && posts && map(posts, (post, uid) => ({
        ...post,
        uid,
        author: {
          ...authors[post.author],
          uid: post.author,
        },
        comments: map(post.comments, (comment, uid) => ({
          ...comment,
          uid,
          author: authors[comment.author],
        })),
      })),
    };
  }),
);

export default withPosts;
