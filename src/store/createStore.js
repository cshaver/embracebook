import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { browserHistory } from 'react-router'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import makeRootReducer from './reducers'
import firebase from 'firebase'
// import 'firebase/firestore' // make sure you add this for firestore
import * as config from '../../project.config'
import { version } from '../../package.json'
import { updateLocation } from './location'

export default (initialState = {}) => {
  // ======================================================
  // Window Vars Config
  // ======================================================
  window.version = version

  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [
    thunk.withExtraArgument(getFirebase)
    // This is where you add other middleware like redux-observable
  ]

  // Initialize Firebase instance and Firestore (optional)
  firebase.initializeApp(config.firebase)
  // firebase.firestore()

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================

  let composeReducers = compose
  const devTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

  // enable Redux dev tools
  if (__DEV__) {
    composeReducers = devTools ? devTools({
      actionsBlacklist: ['@@reactReduxFirebase']
    }) : compose
  }

  const store = createStore(
    makeRootReducer(),
    initialState,
    composeReducers(
      // pass firebase or app instance and config
      reactReduxFirebase(firebase, config.reduxFirebase),
      applyMiddleware(...middleware)
    )
  )
  store.asyncReducers = {}

  // optional way to listen for auth ready (requires attachAuthIsReady: true)
  // store.firebaseAuthIsReady.then(() => {
  //   console.log('Auth has loaded') // eslint-disable-line no-console
  // })

  // To unsubscribe, invoke `store.unsubscribeHistory()` anytime
  store.unsubscribeHistory = browserHistory.listen(updateLocation(store))

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  return store
}
