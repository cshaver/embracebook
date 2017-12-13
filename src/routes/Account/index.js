import { ACCOUNT_PATH as path } from '../../constants';
import component from '../../containers/Account';
import { UserIsAuthenticated } from '../../utils/router';

export default {
  path,
  component: UserIsAuthenticated(component),
};
