import React from 'react';
import PropTypes from 'prop-types';

const Dialog = ({ title, open, children }) => (
  <dialog open={open}>
    <h2>{title}</h2>
    {children}
  </dialog>
);

Dialog.propTypes = {
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
};

export default Dialog;
