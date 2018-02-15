import { combineReducers } from 'redux';

import { newProfileModalReducer as newProfile } from 'embracebook/containers/NPCList/reducers';

const reducer = combineReducers({
  newProfile,
});

export default reducer;
