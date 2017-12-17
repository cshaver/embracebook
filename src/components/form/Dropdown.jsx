import React from 'react';
import PropTypes from 'prop-types';

import inputShape from '../../shapes/input';

const Dropdown = (props) => {
  const {
    label,
    placeholder,
    input: {
      name,
      value,
      onBlur,
      onChange,
      onFocus,
    },
  } = props;
  return (
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
      />
    </label>
  );
};

Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  input: inputShape,
};

Dropdown.defaultProps = {
  placeholder: null,
  input: {},
};

export default Dropdown;
