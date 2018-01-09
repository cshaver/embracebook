import React from 'react';
import PropTypes from 'prop-types';

import inputShape from 'embracebook/shapes/input';
import formMetaShape from 'embracebook/shapes/formMeta';

import ErrorMessage from './ErrorMessage';

const Radio = ({
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
      type="radio"
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

Radio.propTypes = {
  label: PropTypes.string.isRequired,
  input: inputShape,
  meta: formMetaShape,
};

Radio.defaultProps = {
  input: {},
  meta: {},
};

export default Radio;
