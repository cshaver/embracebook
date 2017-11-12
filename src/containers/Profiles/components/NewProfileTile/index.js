import React from 'react'
import PropTypes from 'prop-types'
import classes from './index.scss'

export const NewProfileTile = ({ onClick }) => (
  <button onClick={onClick}>
    Add Profile
  </button>
)

NewProfileTile.propTypes = {
  onClick: PropTypes.func
}

export default NewProfileTile
