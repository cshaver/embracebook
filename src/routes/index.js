// We only need to import the modules necessary for initial render
// import Layout from '../components/Layout';
import Feed from './feed';
import Login from './login';
import Profile from './profile';
import NPCs from './npcs';
import Players from './players';
import Account from './account';
import NotFound from './not-found';
import NoAccess from './no-access';


/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

// export const createRoutes = store => ({
//   path: '/',
//   component: Layout,
//   indexRoute: Feed,
//   childRoutes: [
//     Account,
//     Login,
//     NoAccess(store),
//     // async route definitions recieve store
//     NPCs(store),
//     Players(store),
//     Profile(store),
//     // Place all routes above here so NotFound can act as a 404 page
//     NotFound(store),
//   ],
// });

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


const routes = {
  Feed,
  Login,
  Profile,
  NPCs,
  Players,
  Account,
  NotFound,
  NoAccess,
};

export default routes;
// export {...routes};
