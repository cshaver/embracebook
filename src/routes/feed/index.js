import { withRouter } from 'react-router';

import Feed from '../../containers/Feed';
import { UserIsAuthenticated } from '../../utils/router';

// Sync route definition
export default withRouter(UserIsAuthenticated(Feed));
