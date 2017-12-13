import React from 'react';

export const DeleteButton = ({ showDelete, onDelete }) => (showDelete && onDelete ? (
  <button onClick={onDelete}>Delete</button>
) : null);

export default DeleteButton;
