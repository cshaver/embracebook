import { PLAYER_LIST_PATH as path } from 'constants';
import { UserIsAuthenticated } from 'utils/router';

export default store => ({
  path,
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure(
      [],
      (require) => {
        /*  Webpack - use require callback to define
          dependencies for bundling   */
        const PlayerList = require('containers/PlayerList').default;

        /*  Return getComponent   */
        cb(null, UserIsAuthenticated(PlayerList));

        /* Webpack named bundle   */
      },
      'PlayerList',
    );
  },
  // getChildRoutes(partialNextState, cb) {
  //   require.ensure([], require => {
  //     /*  Webpack - use require callback to define
  //         dependencies for bundling   */
  //     const Profile = require('./routes/profile').default
  //
  //     /*  Return getComponent   */
  //     cb(null, [Profile(store)])
  //   })
  // }
});
