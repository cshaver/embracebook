import { combineReducers } from 'redux'

import { newProfileModalReducer as newProfile } from 'containers/Profiles/reducers'
// import { newPostFormReducer as newPost } from 'containers/Posts/reducers'

const reducer = combineReducers({
  newProfile
})

export default reducer
