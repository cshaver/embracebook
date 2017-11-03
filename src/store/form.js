import { combineReducers } from 'redux'

import { newProfileReducer } from 'routes/Profiles/reducers'

export const formReducer = combineReducers({
	newProfile: newProfileReducer
})
