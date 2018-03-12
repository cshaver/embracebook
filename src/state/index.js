import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import firebase from 'firebase';
import { composeWithDevTools } from 'redux-devtools-extension';

import * as config from '../../webpack/config/project.config';

import createRootReducer from './reducer';

const initialState = {
  firebase: { authError: null },
};

export class State {
  constructor(initialState = State.initialState) {
    const enhancers = [
      reactReduxFirebase(firebase, config.reduxFirebase),
    ];

    const middleware = [
      thunk.withExtraArgument(getFirebase),
    ];

    if (!firebase.apps.length) {
      firebase.initializeApp(config.firebase);
    }

    const composeEnhancers = composeWithDevTools({
      actionsBlacklist: [
        // '@@reactReduxFirebase',
      ],
    });

    this.store = createStore(
      createRootReducer({}),
      initialState,
      composeEnhancers(
        ...enhancers,
        applyMiddleware(...middleware),
      ),
    );

    this.store.asyncReducers = {};

    if (module.hot) {
      module.hot.accept('./reducer', () => {
        this.store.replaceReducer(createRootReducer(this.store.asyncReducers));
      });
    }
  }

  injectReducer(key, reducer) {
    if (Object.hasOwnProperty.apply(this.store.asyncReducers, key)) return;

    this.store.asyncReducers[key] = reducer;
    this.store.replaceReducer(createRootReducer(this.store.asyncReducers));
  }
}

State.initialState = initialState;

export default new State();
