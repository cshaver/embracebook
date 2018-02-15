import React from 'react';


const PostList = ({ profile, children }) => (
  <Link to={`/profile/${profile.uid}/${profile.slug || ''}`}>
    {children || profile.displayName || profile.uid}
  </Link>
);

PostList.propTypes = {
  profile: profileShape.isRequired,
  children,
};

PostList.defaultProps = {
  children: null,
};

export default PostList;
