import React from 'react';
import PropTypes from 'prop-types';

const NewProfileTile = ({ onClick }) => (
  <button onClick={onClick}>
    Add Profile
  </button>
);

NewProfileTile.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default NewProfileTile;
