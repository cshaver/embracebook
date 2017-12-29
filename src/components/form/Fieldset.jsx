import React from 'react';
import PropTypes from 'prop-types';

import children from '../../shapes/children';

const Fieldset = ({ label, children }) => (
  <fieldset>
    <legend>{label}</legend>
    {children}
  </fieldset>
);

Fieldset.propTypes = {
  label: PropTypes.string.isRequired,
  children: children.isRequired,
};

export default Fieldset;
