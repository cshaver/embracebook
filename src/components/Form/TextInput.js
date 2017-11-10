import React from 'react'

export const TextInput = ({
  label,
  placeholder,
  input: { name, onBlur, onChange, onFocus, value }
}) => {
  let labelElement

  if (label) {
    labelElement = <label htmlFor={name}>{label}</label>
  }

  return (
    <div>
      {labelElement}
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
    </div>
  )
}

export default TextInput
