import React from 'react';
import Loadable from 'react-loadable';

import ProgressIndicator from '../../components/ProgressIndicator';

const LoadableRoute = Loadable({
  loader: () => import('../../components/NoAccess'),
  loading: ProgressIndicator,
});

export default () => (
  <LoadableRoute />
);
