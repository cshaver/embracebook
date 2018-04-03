import React from 'react';
import { ReactRouterLink } from 'react-router-dom';

import { withStyles, withStylesPropTypes } from './utils/withStyles';
import children from '../shapes/children';

const propTypes = {
  ...withStylesPropTypes,
  children: children.isRequired,
};

const Link = ({ children, css, styles, ...props }) => (
  <span {...css(styles.link)}>
    <ReactRouterLink {...props}>
      {children}
    </ReactRouterLink>
  </span>
);

Link.propTypes = propTypes;

export default withStyles(({ color }) => ({
  link: {
    color: color.link,
  },
}))(Link);
