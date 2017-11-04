import { combineReducers } from 'redux'

import { newProfileFormReducer as newProfile } from 'routes/Profiles/reducers'
import { newPostFormReducer as newPost } from 'routes/Posts/reducers'

export const formReducer = combineReducers({
	newProfile,
	newPost
})
