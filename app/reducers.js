import { combineReducers } from 'redux';
import { firebaseStateReducer as firebase } from 'react-redux-firebase';

export default asyncReducers => (
  combineReducers({
    firebase,
    ...asyncReducers,
  })
);
