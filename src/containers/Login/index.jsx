import React from 'react';
import { compose } from 'redux';
import FirebaseUIAuth from '../FirebaseUIAuth';
import {
  TERMS_PATH,
} from 'embracebook/constants';

const LoginPage = () => (
  <React.Fragment>
    <FirebaseUIAuth tosUrl={TERMS_PATH} />
  </React.Fragment>
);

export default LoginPage;
