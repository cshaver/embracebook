import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import { newProfileFormReducer as newProfile } from 'containers/Profiles/reducers'
// import { newPostFormReducer as newPost } from 'containers/Posts/reducers'

const reducer = formReducer.plugin({
  newProfile
})

export default reducer
