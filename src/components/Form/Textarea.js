import React from 'react';

const Textarea = ({
  label,
  placeholder,
  input: {
    name, onBlur, onChange, onFocus, disabled, value,
  },
  meta: { error, dirty },
}) => {
  let labelElement;

  if (label) {
    labelElement = <label htmlFor={name}>{label}</label>;
  }

  return (
    <div>
      {labelElement}
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
        <div>{error}</div>
      )}
    </div>
  );
};

export default Textarea;
