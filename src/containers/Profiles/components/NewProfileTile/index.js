import React from 'react'
import PropTypes from 'prop-types'
import classes from './index.scss'

const iconSize = '6rem'
const iconStyle = { width: iconSize, height: iconSize }
const color = '#979797'
const hoverColor = '#616161'

export const NewProfileTile = ({ onClick }) => (
  <button onClick={onClick}>
    Add Profile
  </button>
)

NewProfileTile.propTypes = {
  onClick: PropTypes.func
}

export default NewProfileTile
