import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import CommentList from 'embracebook/containers/CommentList';
import DeleteButton from 'embracebook/components/form/DeleteButton';
import ProfileLink from 'embracebook/components/ProfileLink';

import userShape from 'embracebook/shapes/user';
import postShape from 'embracebook/shapes/post';
import profileShape from 'embracebook/shapes/profile';

const Post = ({
  post, onDelete, showDelete, profiles, user, hasAuthorConfig,
}) => (
  <blockquote>
    <div>
      <ProfileLink profile={post.author} />
      &nbsp;
      <i>{post.timestamp ? moment.unix(post.timestamp).fromNow() : ''}</i>
      <p>{post.content}</p>
      <DeleteButton showDelete={showDelete} onDelete={onDelete} />
    </div>
    <CommentList hasAuthorConfig={hasAuthorConfig} profiles={profiles} post={post} user={user} />
  </blockquote>
);

Post.propTypes = {
  post: postShape.isRequired,
  profiles: PropTypes.arrayOf(profileShape),
  user: userShape,
  onDelete: PropTypes.func,
  showDelete: PropTypes.bool,
  hasAuthorConfig: PropTypes.bool,
};

Post.defaultProps = {
  profiles: [],
  user: null,
  onDelete: null,
  showDelete: false,
  hasAuthorConfig: false,
};

export default Post;
