import React from 'react';
import PropTypes from 'prop-types';

const DeleteButton = ({ showDelete, onDelete }) => (
  showDelete && onDelete ? (
    <button onClick={onDelete}>Delete</button>
  )
    : null
);

DeleteButton.propTypes = {
  showDelete: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteButton;
