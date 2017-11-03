import { TOGGLE_NEW_PROFILE_MODAL } from './actions'

// ------------------------------------
// Reducer
// ------------------------------------
export function newProfileReducer(state = null, action) {
  switch (action.type) {
    case TOGGLE_NEW_PROFILE_MODAL:
    	if (typeof action.open !== 'undefined') {
    		return action.open ? state || {} : null
    	}
      return state ? null : {}
    default:
    	return state
  }
}
