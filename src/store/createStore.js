import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import firebase from 'firebase';

import makeRootReducer from './reducers';
import * as config from '../../webpack/config/project.config';
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

  firebase.initializeApp(config.firebase);

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================

  let composeReducers = compose;
  // eslint-disable-next-line no-underscore-dangle
  const devTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

  // enable Redux dev tools
  // eslint-disable-next-line no-undef
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
