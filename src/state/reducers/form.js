import { reducer as formReducer } from 'redux-form';

import { newProfileFormReducer as newProfile } from 'embracebook/containers/NPCList/reducers';

const reducer = formReducer.plugin({
  newProfile,
});

export default reducer;
