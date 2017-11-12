import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'

export default class AppContainer extends Component {
  static propTypes = {
    routes: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  }

  render() {
    const { routes, store } = this.props
    return (
      <Provider store={store}>
        <Router history={browserHistory}>{routes}</Router>
      </Provider>
    )
  }
}
