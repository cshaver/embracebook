import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import { HOME_PATH, LOGIN_PATH } from '../constants';
import ProgressIndicator from '../components/ProgressIndicator';

/**
 * @description HOC that redirects to `/login` instead of rendering
 *              if user is not authenticated.
 * @param  {Component} componentToWrap - Component to wrap
 * @return {Component} wrappedComponent
 */
export const UserIsAuthenticated = connectedRouterRedirect({
  wrapperDisplayName: 'UserIsAuthenticated',
  AuthenticatingComponent: ProgressIndicator,
  redirectPath: LOGIN_PATH,
  authenticatedSelector: ({ firebase: { auth } }) => !auth.isEmpty,
  authenticatingSelector: ({ firebase: { auth, isInitializing } }) =>
    !auth.isLoaded || isInitializing,
});

/**
 * @description HOC that redirects to home page or most recent route
 *              instead rendering if user is already authenticated.
 * @param  {Component} componentToWrap - Component to wrap
 * @return {Component} wrappedComponent
 */
export const UserIsNotAuthenticated = connectedRouterRedirect({
  wrapperDisplayName: 'UserIsNotAuthenticated',
  AuthenticatingComponent: ProgressIndicator,
  redirectPath: HOME_PATH,
  authenticatedSelector: ({ firebase: { auth } }) => auth.isEmpty,
  authenticatingSelector: ({ firebase: { auth, isInitializing } }) =>
    !auth.isLoaded || isInitializing,
});

export default {
  UserIsAuthenticated,
  UserIsNotAuthenticated,
};
