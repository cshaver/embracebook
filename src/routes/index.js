// We only need to import the modules necessary for initial render
import Layout from '../components/Layout';
import Feed from './feed';
import LoginRoute from './login';
import ProfileRoute from './profile';
import NPCsRoute from './npcs';
import PlayersRoute from './players';
import AccountRoute from './account';
import NotFoundRoute from './not-found';
import NoAccessRoute from './no-access';

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = store => ({
  path: '/',
  component: Layout,
  indexRoute: Feed,
  childRoutes: [
    AccountRoute,
    LoginRoute,
    NoAccessRoute(store),
    // async route definitions recieve store
    NPCsRoute(store),
    PlayersRoute(store),
    ProfileRoute(store),
    // Place all Routes above here so NotFoundRoute can act as a 404 page
    NotFoundRoute(store),
  ],
});

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes;
