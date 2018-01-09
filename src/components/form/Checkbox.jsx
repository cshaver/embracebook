import React from 'react';
import PropTypes from 'prop-types';

import inputShape from 'embracebook/shapes/input';
import formMetaShape from 'embracebook/shapes/formMeta';

import ErrorMessage from './ErrorMessage';

const Checkbox = ({
  label,
  input: {
    name, onBlur, onChange, onFocus, disabled, checked,
  },
  meta: {
    error, submitFailed,
  },
}) => (
  <label htmlFor={name}>
    {label}
    <input
      type="checkbox"
      id={name}
      name={name}
      checked={checked}
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

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  input: inputShape,
  meta: formMetaShape,
};

Checkbox.defaultProps = {
  input: {},
  meta: {},
};

export default Checkbox;
