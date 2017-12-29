import { withRouter } from 'react-router';

import Feed from '../../containers/Feed';
import { UserIsAuthenticated } from '../../utils/auth';

// Sync route definition
export default withRouter(UserIsAuthenticated(Feed));
