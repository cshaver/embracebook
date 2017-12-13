import { NO_ACCESS_PATH } from 'constants';

export default () => ({
  path: NO_ACCESS_PATH,
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure(
      [],
      (require) => {
        /*  Webpack - use require callback to define
          dependencies for bundling   */
        const NoAccess = require('../../components/NoAccess').default;

        /*  Return getComponent   */
        cb(null, NoAccess);

        /* Webpack named bundle   */
      },
      'NoAccess',
    );
  },
});
