import React from 'react'

export const Dialog = ({ title, open, children }) => (
  <dialog open={open}>
    <h2>{title}</h2>
    {children}
  </dialog>
)

export default Dialog
