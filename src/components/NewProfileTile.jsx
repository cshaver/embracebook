import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  onClick: PropTypes.func.isRequired,
};

const NewProfileTile = ({ onClick }) => (
  <button onClick={onClick}>
    Add Profile
  </button>
);

NewProfileTile.propTypes = propTypes;

export default NewProfileTile;
