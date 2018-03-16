import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { css, withStyles, withStylesPropTypes } from 'react-with-styles';

const propTypes = {
  ...withStylesPropTypes,
  name: PropTypes.string.isRequired,
};

const Error = ({ name, styles }) => (
  <Field
    name={name}
    subscription={{ touched: true, error: true }}
    render={({ meta: { touched, error } }) =>
      (touched && error ?
        <span id={`${name}-error`} {...css(styles.error)}>{error}</span>
        : null)
    }
  />
);

Error.propTypes = propTypes;

export default withStyles(({ color }) => ({
  error: {
    color: color.error,
  },
}))(Error);
