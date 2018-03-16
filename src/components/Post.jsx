import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { css, withStyles, withStylesPropTypes } from 'react-with-styles';

import CommentListContainer from 'embracebook/containers/CommentListContainer';
import Button from 'embracebook/components/form/Button';
import ProfileLink from 'embracebook/components/ProfileLink';

import postShape from 'embracebook/shapes/post';
import profileShape from 'embracebook/shapes/profile';

const propTypes = {
  post: postShape.isRequired,
  user: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  showDelete: PropTypes.bool.isRequired,
  hasAuthorConfig: PropTypes.bool,
  authorProfiles: PropTypes.arrayOf(profileShape),
};

const defaultProps = {
  authorProfiles: [],
  hasAuthorConfig: false,
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
      styles,
      post,
      showDelete,
      user,
      hasAuthorConfig,
      authorProfiles,
    } = this.props;

    const { author, timestamp, content } = post;

    console.log(post);
    return (
      <blockquote {...css(styles.container)}>
        <div>
          <ProfileLink profile={author} />
          {' '}
          {timestamp && <i {...css(styles.timestamp)}>{moment(timestamp).fromNow()}</i>}
          {' '}
          <p {...css(styles.content)}>{content}</p>
          {' '}
          {showDelete && <Button copy="Delete" onPress={this.onDelete} />}
        </div>
        <CommentListContainer
          hasAuthorConfig={hasAuthorConfig}
          authorProfiles={authorProfiles}
          post={post}
          user={user}
        />
      </blockquote>
    );
  }
}

Post.propTypes = propTypes;
Post.defaultProps = defaultProps;

export default withStyles(({ color }) => ({
  container: {
    border: `2px solid ${color.green}`,
  },
  timestamp: {
    color: color.dimmed,
  },
  content: {
    display: 'inline',
  },
}))(Post);
