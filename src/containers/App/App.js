import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'

export default class AppContainer extends Component {
  render() {
    const { routes, store } = this.props
    console.log(routes, store);
    return (
      <Provider store={store}>
        <Router history={browserHistory}>{routes}</Router>
      </Provider>
    )
  }
}

AppContainer.propTypes = {
  routes: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
}
