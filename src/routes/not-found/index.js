import { withRouter } from 'react-router';

// export default () => ({
//   path: '*',
//   /*  Async getComponent is only invoked when route matches   */
//   getComponent(nextState, cb) {
//     /*  Webpack - use 'require.ensure' to create a split point
//         and embed an async module loader (jsonp) when bundling   */
//     require.ensure(
//       [],
//       (require) => {
//         /*  Webpack - use require callback to define
//           dependencies for bundling   */
//         const NotFound = require('../../components/NotFound').default;

//         /*  Return getComponent   */
//         cb(null, NotFound);

//         /* Webpack named bundle   */
//       },
//       'NotFound',
//     );
//   },
// });

import component from '../../components/NotFound';

export default withRouter(component);
