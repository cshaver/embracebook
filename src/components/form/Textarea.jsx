import React from 'react';
import PropTypes from 'prop-types';

import inputShape from 'embracebook/shapes/input';
import formMetaShape from 'embracebook/shapes/formMeta';

import ErrorMessage from './ErrorMessage';

const Textarea = ({
  label,
  placeholder,
  input: {
    name, onBlur, onChange, onFocus, disabled, value,
  },
  meta: {
    error, dirty,
  },
}) => (
  <label htmlFor={name}>
    {label}
    <textarea
      placeholder={placeholder}
      id={name}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
      defaultValue={value}
      disabled={disabled ? 'disabled' : ''}
    />
    {error && dirty && (
      <ErrorMessage>{error}</ErrorMessage>
    )}
  </label>
);

Textarea.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  input: inputShape,
  meta: formMetaShape,
};

Textarea.defaultProps = {
  placeholder: null,
  input: {},
  meta: {},
};

export default Textarea;
