import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import ProfileLink from 'embracebook/components/ProfileLink';
import Button from 'embracebook/components/form/Button';
import { css, withStyles, withStylesPropTypes } from 'react-with-styles';

const propTypes = {
  ...withStylesPropTypes,
  onDelete: PropTypes.func.isRequired,
  showDelete: PropTypes.bool.isRequired,
  comment: PropTypes.shape({}).isRequired,
};

class Comment extends React.Component {
  constructor() {
    super();

    this.onDelete = this.onDelete.bind(this);
  }

  onDelete() {
    const { onDelete, comment } = this.props;

    return onDelete(comment.uid);
  }

  render() {
    const { comment, showDelete, styles } = this.props;
    const { author, content, timestamp } = comment;

    return (
      <React.Fragment>
        <ProfileLink profile={author} />
        {' '}
        {timestamp && <i {...css(styles.timestamp)}>{moment(timestamp).fromNow()}</i>}
        {' '}
        {content}
        {' '}
        {showDelete && <Button copy="Delete" onPress={this.onDelete} />}
      </React.Fragment>
    );
  }
}

Comment.propTypes = propTypes;

export default withStyles(({ color }) => ({
  timestamp: {
    color: color.dimmed,
  },
}))(Comment);
