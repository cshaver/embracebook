import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';
import {
  firebaseStateReducer as firebase, /* ,
  firestoreReducer */
} from 'react-redux-firebase';
import locationReducer from './location';
import formReducer from './form';
import modalReducer from './modal';

export const makeRootReducer = asyncReducers => combineReducers({
  // Add sync reducers here
  firebase,
  // firestore: firestoreReducer,
  form: formReducer,
  location: locationReducer,
  modal: modalReducer,
  ...asyncReducers,
});

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
