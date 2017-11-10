import React from 'react'

export const DeleteButton = ({ showDelete, onDelete }) => {
  return showDelete && onDelete ? (
    <button onClick={onDelete}>Delete</button>
  ) : null
}

export default DeleteButton
