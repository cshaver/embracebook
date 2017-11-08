// ------------------------------------
// Constants
// ------------------------------------
export const TOGGLE_NEW_POST_MODAL = 'Posts/TOGGLE_NEW_POST_MODAL'

// ------------------------------------
// Actions
// ------------------------------------
export function toggleNewPostModal(dispatch) {
	return ({open, ...props}) => {
		dispatch({
	  	type: TOGGLE_NEW_POST_MODAL,
	  	open,
	  	props
	  })
	}
}
