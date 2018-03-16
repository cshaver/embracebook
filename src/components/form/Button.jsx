import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  copy: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

const Button = ({ copy, onPress }) => (
  <button onClick={onPress}>{copy}</button>
);

Button.propTypes = propTypes;

export default Button;
