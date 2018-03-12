import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';

const propTypes = {
  name: PropTypes.string.isRequired,
};

const Error = ({ name }) => (
  <Field
    name={name}
    subscription={{ touched: true, error: true }}
    render={({ meta: { touched, error } }) =>
      (touched && error ? <span id={`${name}-error`}>{error}</span> : null)
    }
  />
);

Error.propTypes = propTypes;

export default Error;
