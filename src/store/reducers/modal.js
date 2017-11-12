import { combineReducers } from 'redux'

import { newProfileModalReducer as newProfile } from 'containers/Profiles/reducers'

const reducer = combineReducers({
  newProfile
})

export default reducer
