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
    // console.group('withPosts');
    // console.log('profiles', profiles);
    // console.log('posts', posts);
    // console.log('users', users);
    // console.groupEnd();

    const authors = {
      ...users,
      ...profiles,
    };

    console.log(authors);

    return {
      posts: profiles && users && posts ? map(posts, (post, uid) => ({
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
      })) : [],
    };
  }),
);

export default withPosts;
