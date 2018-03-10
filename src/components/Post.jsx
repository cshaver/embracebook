import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import CommentListContainer from 'embracebook/containers/CommentListContainer';
import DeleteButton from 'embracebook/components/form/DeleteButton';
import ProfileLink from 'embracebook/components/ProfileLink';

import postShape from 'embracebook/shapes/post';
import profileShape from 'embracebook/shapes/profile';

const propTypes = {
  post: postShape.isRequired,
  profiles: PropTypes.arrayOf(profileShape),
  user: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  showDelete: PropTypes.bool.isRequired,
  hasAuthorConfig: PropTypes.bool.isRequired,
  authorProfiles: PropTypes.arrayOf(profileShape),
};

const defaultProps = {
  profiles: [],
  authorProfiles: [],
};

class Post extends React.Component {
  constructor() {
    super();

    this.onDelete = this.onDelete.bind(this);
  }

  onDelete() {
    const { onDelete, post } = this.props;
    return onDelete(post.uid);
  }

  render() {
    const {
      post,
      showDelete,
      profiles,
      user,
      hasAuthorConfig,
      authorProfiles,
    } = this.props;

    return (
      <blockquote>
        <div>
          <ProfileLink profile={post.author} />
          &nbsp;
          <i>{post.timestamp ? moment(post.timestamp).fromNow() : ''}</i>
          <p>{post.content}</p>
          <DeleteButton showDelete={showDelete} onDelete={this.onDelete} />
        </div>
        <CommentListContainer
          hasAuthorConfig={hasAuthorConfig}
          authorProfiles={authorProfiles}
          profiles={profiles}
          post={post}
          user={user}
        />
      </blockquote>
    );
  }
}

Post.propTypes = propTypes;
Post.defaultProps = defaultProps;

export default Post;
