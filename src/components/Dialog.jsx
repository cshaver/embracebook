import React from 'react';
import PropTypes from 'prop-types';

import children from '../shapes/children';

const Dialog = ({ title, open, children }) => (
  <dialog open={open}>
    <h2>{title}</h2>
    {children}
  </dialog>
);

Dialog.propTypes = {
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  children: children.isRequired,
};

export default Dialog;
