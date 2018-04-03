import React from 'react';
import PropTypes from 'prop-types';

import Button from './form/Button';

const propTypes = {
  onClick: PropTypes.func.isRequired,
};

const NewProfileTile = ({ onClick }) => (
  <Button onClick={onClick} copy="Add Profile" />
);

NewProfileTile.propTypes = propTypes;

export default NewProfileTile;
