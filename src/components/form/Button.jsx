import React from 'react';
import PropTypes from 'prop-types';

import { withStyles, withStylesPropTypes } from 'embracebook/components/utils/withStyles';

const propTypes = {
  ...withStylesPropTypes,
  copy: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};

const defaultProps = {
  onPress: null,
};

const Button = ({ copy, onPress, css, styles, theme, ...props }) => (
  <button onClick={onPress} {...css(styles.button)} {...props}>{copy}</button>
);

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default withStyles(({ color }) => ({
  button: {
    display: 'block',
    border: 0,
    color: color.purple,
    padding: 0,
    cursor: 'pointer',

    ':hover': {
      color: color.page,
      background: color.purple,
    },

    ':before': {
      content: '\'[\'',
    },

    ':after': {
      content: '\']\'',
    },
  },
}))(Button);
