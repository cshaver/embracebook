import { combineReducers } from 'redux';
import {
  firebaseStateReducer as firebase, /* ,
  firestoreReducer */
} from 'react-redux-firebase';
import locationReducer from './location';
import formReducer from './form';
import modalReducer from './modal';

const makeRootReducer = asyncReducers => combineReducers({
  // Add sync reducers here
  firebase,
  // firestore: firestoreReducer,
  form: formReducer,
  location: locationReducer,
  modal: modalReducer,
  ...asyncReducers,
});

export default makeRootReducer;
