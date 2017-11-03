// ------------------------------------
// Constants
// ------------------------------------
export const PROFILE_NEW = 'PROFILE_NEW'

// ------------------------------------
// Actions
// ------------------------------------
export function newProfile(authData = null) {
  return {
    type: PROFILE_NEW,
    payload: location
  }
}

// ------------------------------------
// Specialized Action Creator
// ------------------------------------
export const addProfile = ({ dispatch }) => {
  return profile => dispatch(newProfile(profile))
}

// ------------------------------------
// Reducer
// ------------------------------------

// wait for SET_PROFILE action
// fire another function for "initializeProfile"

export const profileReducer = (state = null, action) => {
  switch (action.type) {
    case '@@reactReduxFirebase/SET_PROFILE':
      // console.log('@@reactReduxFirebase/SET_PROFILE')
      // if (!state.type) {
      //   state.isNew = true
      // }
      return state
    default:
      return state
  }
}
