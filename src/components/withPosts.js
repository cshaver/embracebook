import { connect } from 'react-redux';
import { compose } from 'recompose';
import { firebaseConnect } from 'react-redux-firebase';
import { map } from 'lodash';

const withPosts = compose(
  firebaseConnect([
    'posts',
    'profiles',
  ]),
  connect(({
    firebase: { data: { profiles, posts } },
  }) => (
    {
      profiles,
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
);

export default withPosts;
