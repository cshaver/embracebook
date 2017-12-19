import { withRouter } from 'react-router';
// import { ACCOUNT_PATH as path } from '../../constants';

import component from '../../containers/Account';
import { UserIsAuthenticated } from '../../utils/router';

// export default {
//   path,
//   component: UserIsAuthenticated(component),
// };

export default withRouter(UserIsAuthenticated(component));
