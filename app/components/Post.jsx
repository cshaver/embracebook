import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { withStyles, withStylesPropTypes } from './utils/withStyles';
import CommentListContainer from '../containers/CommentListContainer';
import Button from './form/Button';
import ProfileLink from './ProfileLink';

import postShape from '../shapes/post';
import profileShape from '../shapes/profile';

const propTypes = {
  ...withStylesPropTypes,
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
      css,
      styles,
      post,
      showDelete,
      user,
      hasAuthorConfig,
      authorProfiles,
    } = this.props;

    const { author, timestamp, content } = post;

    return (
      <div {...css(styles.container)}>
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
      </div>
    );
  }
}

Post.propTypes = propTypes;
Post.defaultProps = defaultProps;

export default withStyles(({ color, unit }) => ({
  container: {
    border: `${unit}px ridge ${color.green}`,
    margin: `${2 * unit}px 0`,
    padding: 2 * unit,
  },

  timestamp: {
    color: color.dimmed,
  },

  content: {
    display: 'inline',
  },
}))(Post);
