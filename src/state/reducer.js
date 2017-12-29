import { combineReducers } from 'redux';
import { firebaseStateReducer as firebase } from 'react-redux-firebase';

import location from './reducers/location';
import form from './reducers/form';
import modal from './reducers/modal';

export default asyncReducers => (
  combineReducers({
    firebase,
    form,
    location,
    modal,
    ...asyncReducers,
  })
);
