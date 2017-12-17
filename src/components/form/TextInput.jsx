import React from 'react';
import PropTypes from 'prop-types';

import inputShape from '../../shapes/input';
import formMetaShape from '../../shapes/formMeta';

const TextInput = ({
  label,
  placeholder,
  input: {
    name, onBlur, onChange, onFocus, disabled, value,
  },
  meta: {
    error, submitFailed,
  },
}) => (
  <label htmlFor={name}>
    {label}
    <input
      type="text"
      placeholder={placeholder}
      id={name}
      name={name}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
      disabled={disabled ? 'disabled' : ''}
    />
    {error && submitFailed && (
      <div>{error}</div>
    )}
  </label>
);

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  input: inputShape,
  meta: formMetaShape,
};

TextInput.defaultProps = {
  placeholder: null,
  input: {},
  meta: {},
};

export default TextInput;
