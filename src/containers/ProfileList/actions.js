// ------------------------------------
// Constants
// ------------------------------------
export const TOGGLE_NEW_PROFILE_MODAL = 'ProfileList/TOGGLE_NEW_PROFILE_MODAL';

// ------------------------------------
// Actions
// ------------------------------------
export function toggleNewProfileModal(dispatch) {
  return ({ open, ...props }) => {
    dispatch({
      type: TOGGLE_NEW_PROFILE_MODAL,
      open,
      props,
    });
  };
}
