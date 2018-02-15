import React from 'react';
import PropTypes from 'prop-types';

import DeleteButton from 'embracebook/components/form/DeleteButton';

const propTypes = {
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
    const { comment, showDelete } = this.props;

    return (
      <React.Fragment>
        <b>{comment.author ? comment.author.displayName : ''}:</b>
        {comment.content}
        <DeleteButton showDelete={showDelete} onDelete={this.onDelete} />
      </React.Fragment>
    );
  }
}

Comment.propTypes = propTypes;

export default Comment;
