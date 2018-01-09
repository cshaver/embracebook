import React from 'react';
import PropTypes from 'prop-types';

const DeleteButton = ({ showDelete, onDelete }) => (
  showDelete && onDelete ? (
    <button onClick={onDelete}>Delete</button>
  )
    : null
);

DeleteButton.propTypes = {
  showDelete: PropTypes.bool,
  onDelete: PropTypes.func,
};

DeleteButton.defaultProps = {
  showDelete: false,
  onDelete: null,
};

export default DeleteButton;
