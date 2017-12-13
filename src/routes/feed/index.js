import Feed from 'containers/Feed';
import { UserIsAuthenticated } from 'utils/router';

// Sync route definition
export default {
  component: UserIsAuthenticated(Feed),
};
