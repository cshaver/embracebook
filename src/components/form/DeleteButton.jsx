import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  showDelete: PropTypes.bool,
  onDelete: PropTypes.func,
};

const defaultProps = {
  showDelete: false,
  onDelete: null,
};

const DeleteButton = ({ showDelete, onDelete }) => (
  showDelete && onDelete ? (
    <button onClick={onDelete}>Delete</button>
  ) : null
);

DeleteButton.propTypes = propTypes;
DeleteButton.defaultProps = defaultProps;

export default DeleteButton;
