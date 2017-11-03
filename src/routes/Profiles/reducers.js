import { TOGGLE_NEW_PROFILE_MODAL } from './actions'

import slugify from 'slugify'

// ------------------------------------
// Reducer
// ------------------------------------
export function newProfileFormReducer(state = null, action) {
  switch (action.type) {
    case TOGGLE_NEW_PROFILE_MODAL:
    	if (typeof action.open !== 'undefined') {
    		return action.open ? state || {...action.props} : null
    	}
      return state ? null : {...action.props}
    case '@@redux-form/CHANGE':
    	if (action.meta.field !== 'displayName') {
    		return state
    	}

    	return updateDefaults(state, action.payload)
    default:
    	return state
  }
}

function updateDefaults(state, displayName) {
  const slug = slugify(displayName, { remove: /[^a-z\s]/i, lower: true })

  const defaults = {
	  slug,
	  avatarUrl: `https://api.adorable.io/avatars/${slug || 'default'}.png`
  }

  const { values, initial } = state

  // update if still default
  values.slug = values.slug === initial.slug ? defaults.slug : values.slug
  values.avatarUrl = values.avatarUrl === initial.avatarUrl ? defaults.avatarUrl : values.avatarUrl

  state.initial = { ...initial, ...defaults }

  return state
}
