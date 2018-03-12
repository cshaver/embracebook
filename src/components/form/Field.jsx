import React from 'react';
import PropTypes from 'prop-types';
import { Field as FormField } from 'react-final-form';

import Error from './Error';

const propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  component: PropTypes.string.isRequired,
};

const defaultProps = {
  label: null,
};

const Field = ({ name, label, component, ...props }) => (
  <label>
    {label && label}
    <FormField
      name={name}
      component={component}
      {...props}
    />
    <Error name={name} />
  </label>
);

Field.propTypes = propTypes;
Field.defaultProps = defaultProps;

export default Field;
