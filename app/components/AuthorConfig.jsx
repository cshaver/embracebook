import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';

import Field from './form/Field';
import { required } from '../utils/form';
import profileShape from '../shapes/profile';

const propTypes = {
  profiles: PropTypes.arrayOf(profileShape).isRequired,
};

const AuthorConfig = ({ profiles }) => (
  <Field
    name="author"
    component="select"
    validate={required}
  >
    <option key="default" value="" disabled>Author</option>
    {profiles && map(profiles, ({ uuid, displayName }) => (
      <option key={uuid} value={uuid}>{displayName}</option>
    ))}
  </Field>
);

AuthorConfig.propTypes = propTypes;

export default AuthorConfig;
