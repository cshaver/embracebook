import React from 'react';
import PropTypes from 'prop-types';

import inputShape from 'embracebook/shapes/input';
import formMetaShape from 'embracebook/shapes/formMeta';

import ErrorMessage from './ErrorMessage';

const TextInput = ({
  label,
  type,
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
      type={type}
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
      <ErrorMessage id={`${name}-error`}>{error}</ErrorMessage>
    )}
  </label>
);

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  input: inputShape,
  meta: formMetaShape,
};

TextInput.defaultProps = {
  type: 'text',
  placeholder: null,
  input: {},
  meta: {},
};

export default TextInput;
