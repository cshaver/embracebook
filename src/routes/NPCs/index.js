import { withRouter } from 'react-router';
// /* eslint-disable global-require */

// import { NPC_LIST_PATH as path } from '../../constants';
import { UserIsAuthenticated } from '../../utils/auth';

// export default () => ({
//   path,
//   /*  Async getComponent is only invoked when route matches   */
//   getComponent(nextState, cb) {
//     /*  Webpack - use 'require.ensure' to create a split point
//         and embed an async module loader (jsonp) when bundling   */
//     require.ensure(
//       [],
//       (require) => {
//         /*  Webpack - use require callback to define
//           dependencies for bundling   */
//         const ProfileList = require('../../containers/ProfileList').default;

//         /*  Return getComponent   */
//         cb(null, UserIsAuthenticated(ProfileList));

//         /* Webpack named bundle   */
//       },
//       'ProfileList',
//     );
//   },
//   // getChildRoutes(partialNextState, cb) {
//   //   require.ensure([], require => {
//   //     /*  Webpack - use require callback to define
//   //         dependencies for bundling   */
//   //     const Profile = require('./routes/profile').default
//   //
//   //     /*  Return getComponent   */
//   //     cb(null, [Profile(store)])
//   //   })
//   // }
// });

import component from '../../containers/ProfileList';

export default withRouter(UserIsAuthenticated(component));
