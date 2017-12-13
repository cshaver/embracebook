import { reducer as formReducer } from 'redux-form';

import { newProfileFormReducer as newProfile } from 'containers/ProfileList/reducers';

const reducer = formReducer.plugin({
  newProfile,
});

export default reducer;
