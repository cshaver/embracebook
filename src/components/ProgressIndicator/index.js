import React from 'react'
import PropTypes from 'prop-types'
import classes from './index.scss'

export const ProgressIndicator = ({ size }) => (
  <div className={classes.container}>
    <div className={classes.progress}>
      Loading...
    </div>
  </div>
)

export default ProgressIndicator
