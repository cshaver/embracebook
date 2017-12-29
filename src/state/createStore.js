import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import firebase from 'firebase';

import * as config from '../../webpack/config/project.config';

import rootReducer from './reducer';
// import { updateLocation } from './reducers/location';
//

const INITIAL_STATE = {
  firebase: { authError: null },
};

export default (initialState = INITIAL_STATE) => {
  // Middleware Configuration
  const middleware = [
    thunk.withExtraArgument(getFirebase),
  ];

  if (!firebase.apps.length) {
    firebase.initializeApp(config.firebase);
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================

  let composeReducers = compose;
  // eslint-disable-next-line no-underscore-dangle
  const devTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

  // enable Redux dev tools
  if (devTools) {
    composeReducers = devTools({
      actionsBlacklist: [
        '@@reactReduxFirebase',
        '@@redux-form',
      ],
    });
  }

  const store = createStore(
    rootReducer,
    initialState,
    composeReducers(
      // pass firebase or app instance and config
      reactReduxFirebase(firebase, config.reduxFirebase),
      applyMiddleware(...middleware),
    ),
  );

  // store.asyncReducers = {};

  // optional way to listen for auth ready (requires attachAuthIsReady: true)
  // store.firebaseAuthIsReady.then(() => {
  //   console.log('Auth has loaded') // eslint-disable-line no-console
  // });

  // To unsubscribe, invoke `store.unsubscribeHistory()` anytime
  // store.unsubscribeHistory = browserHistory.listen(updateLocation(store));

  // if (module.hot) {
  //   module.hot.accept('./reducers', () => {
  //     /* eslint-disable global-require */
  //     const nextRootReducer = require('./reducers').default;
  //     store.replaceReducer(nextRootReducer);
  //   });
  // }

  return store;
};
