import React from 'react';

import { TERMS_PATH } from 'embracebook/constants';

import FirebaseUIAuth from './FirebaseUIAuth';

const LoginPage = () => (
  <React.Fragment>
    <FirebaseUIAuth tosUrl={TERMS_PATH} />
  </React.Fragment>
);

export default LoginPage;
