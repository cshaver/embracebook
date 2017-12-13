import React from 'react';

export const Fieldset = ({
  label,
  children,
}) => {
  let labelElement;

  if (label) {
    labelElement = <legend>{label}</legend>;
  }

  return (
    <fieldset>
      {labelElement}
      {children}
    </fieldset>
  );
};

export default Fieldset;
