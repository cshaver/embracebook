import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
// import { browserHistory } from 'react-router-dom';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import firebase from 'firebase';
// import 'firebase/firestore' // make sure you add this for firestore

import makeRootReducer from './reducers';
import * as config from '../../webpack/config/project.config';
// import { updateLocation } from './reducers/location';

export default (initialState = {}) => {
  // Middleware Configuration
  const middleware = [
    thunk.withExtraArgument(getFirebase),
    // This is where you add other middleware like redux-observable
  ];

  // Initialize Firebase instance and Firestore (optional)
  firebase.initializeApp(config.firebase);
  // firebase.firestore()

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================

  let composeReducers = compose;
  /* eslint-disable no-underscore-dangle */
  const devTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

  // enable Redux dev tools
  /* eslint-disable no-undef */
  if (DEV) {
    composeReducers = devTools ? devTools({
      actionsBlacklist: [
        '@@reactReduxFirebase',
        '@@redux-form',
      ],
    }) : compose;
  }

  const store = createStore(
    makeRootReducer(),
    initialState,
    composeReducers(
      // pass firebase or app instance and config
      reactReduxFirebase(firebase, config.reduxFirebase),
      applyMiddleware(...middleware),
    ),
  );
  store.asyncReducers = {};

  // optional way to listen for auth ready (requires attachAuthIsReady: true)
  // store.firebaseAuthIsReady.then(() => {
  //   console.log('Auth has loaded') // eslint-disable-line no-console
  // });

  // To unsubscribe, invoke `store.unsubscribeHistory()` anytime
  // store.unsubscribeHistory = browserHistory.listen(updateLocation(store));

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      /* eslint-disable global-require */
      const reducers = require('./reducers').default;
      store.replaceReducer(reducers(store.asyncReducers));
    });
  }

  return store;
};
