import React from 'react';

import PostList from '../containers/PostList';
import NewPostForm from '../containers/NewPostForm';

const Feed = () => (
  <div>
    <NewPostForm />
    <PostList />
  </div>
);

export default Feed;
