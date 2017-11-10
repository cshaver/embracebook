import React from 'react'
import PropTypes from 'prop-types'
import Navbar from 'containers/Navbar'
import classes from './index.scss'
import 'styles/core.scss'

export const CoreLayout = ({ children }) => (
  <div className={classes.container}>
    <Navbar />
    <main className={classes.children}>{children}</main>
  </div>
)

CoreLayout.propTypes = {
  children: PropTypes.element.isRequired
}

export default CoreLayout
