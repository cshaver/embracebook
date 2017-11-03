import { combineReducers } from 'redux'

import { newProfileFormReducer as newProfile } from 'routes/Profiles/reducers'

export const formReducer = combineReducers({
	newProfile
})
