import React from 'react';
import { withStyles, withStylesPropTypes } from './utils/withStyles';

import childrenShape from '../shapes/children';

const propTypes = {
  ...withStylesPropTypes,
  children: childrenShape.isRequired,
};

const Page = ({ children, css, styles }) => (
  <div {...css(styles.container)}>
    {children}
  </div>
);

Page.propTypes = propTypes;

export default withStyles(({ unit }) => ({
  container: {
    padding: 2 * unit,
  },
}))(Page);
