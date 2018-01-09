import React from 'react';
import PropTypes from 'prop-types';

import children from 'embracebook/shapes/children';

const ErrorMessage = ({ id, children }) => (
  <span id={id}>
    {children}
  </span>
);

ErrorMessage.propTypes = {
  id: PropTypes.string.isRequired,
  children: children.isRequired,
};

export default ErrorMessage;
