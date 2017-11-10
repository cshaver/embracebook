import { combineReducers } from 'redux'

import { newProfileFormReducer as newProfile } from 'containers/Profiles/reducers'
// import { newPostFormReducer as newPost } from 'containers/Posts/reducers'

export const formReducer = combineReducers({
	newProfile
	// newPost
})
