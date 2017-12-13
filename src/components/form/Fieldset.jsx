import React from 'react';
import PropTypes from 'prop-types';

const Fieldset = ({ label, children }) => (
  <fieldset>
    <legend>{label}</legend>
    {children}
  </fieldset>
);

Fieldset.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default Fieldset;
