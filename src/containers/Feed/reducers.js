import { TOGGLE_NEW_POST_MODAL } from './actions';

import slugify from 'slugify';

// ------------------------------------
// Reducer
// ------------------------------------
export function newPostFormReducer(state = null, action) {
  switch (action.type) {
    case TOGGLE_NEW_POST_MODAL:
    	if (typeof action.open !== 'undefined') {
    		return action.open ? state || { ...action.props } : null;
    	}
      return state ? null : { ...action.props };
    default:
    	return state;
  }
}
