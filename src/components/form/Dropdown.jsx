import React from 'react';
import PropTypes from 'prop-types';

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
    <div>
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
    </div>
  );
};

Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  input: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.any,
    onBlur: PropTypes.function,
    onChange: PropTypes.function,
    onFocus: PropTypes.function,
  }),
};

Dropdown.defaultProps = {
  placeholder: null,
  input: {},
};

export default Dropdown;
