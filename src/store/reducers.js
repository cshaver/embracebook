import { combineReducers } from 'redux'
import reduceReducers from 'reduce-reducers';
import { reducer as form } from 'redux-form'
import {
  firebaseStateReducer /*,
  firestoreReducer */
} from 'react-redux-firebase'
import { reducer as notifications } from 'modules/notification'
import locationReducer from './location'
import { profileReducer } from './profile'

const firebase = reduceReducers(
  firebaseStateReducer,
  (state, action) => {
    let profile = profileReducer(state.profile, action)
    if (profile) {
      state.profile = profile
    }
    return state
  }
)

export const makeRootReducer = asyncReducers => {

  return combineReducers({
    // Add sync reducers here
    firebase,
    // firestore: firestoreReducer,
    form,
    location: locationReducer,
    notifications,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
