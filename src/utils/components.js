import PropTypes from 'prop-types';
import { compose, withContext, getContext } from 'recompose';

import { connect } from 'react-redux';
// import { firebaseConnect } from 'react-redux-firebase';

export const withStore = compose(
  withContext({ store: PropTypes.object }, () => {}),
  getContext({ store: PropTypes.object }),
);

export const withRouter = compose(
  withContext({ router: PropTypes.object }, () => {}),
  getContext({ router: PropTypes.object }),
);

export const withStoreAndRouter = compose(
  withContext({ router: PropTypes.object, store: PropTypes.object }, () => {}),
  getContext({ router: PropTypes.object, store: PropTypes.object }),
);

export const withProfile = compose(connect(({ firebase: { profile } }) => ({ profile })));

export const withRoles = compose(connect(({ firebase: { profile: roles } }) => ({ roles })));

export const withAuth = compose(connect(({ firebase: { auth } }) => ({ auth })));
