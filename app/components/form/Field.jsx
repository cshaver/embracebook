import React from 'react';
import PropTypes from 'prop-types';
import { Field as FormField } from 'react-final-form';

import { withStyles, withStylesPropTypes } from '../utils/withStyles';

import Error from './Error';

const propTypes = {
  ...withStylesPropTypes,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  id: PropTypes.string,
  component: PropTypes.string.isRequired,
};

const defaultProps = {
  label: null,
  id: null,
};

const Field = ({ id, name, label, component, styles, css, theme, ...props }) => (
  <label htmlFor={id} {...css(styles.field)}>
    {label}
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

export default withStyles(() => ({
  field: {
    display: 'block',
  },
}))(Field);
