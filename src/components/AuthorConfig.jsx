import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { map } from 'lodash';

import { required } from 'embracebook/utils/form';
import profileShape from 'embracebook/shapes/profile';

const propTypes = {
  profiles: PropTypes.arrayOf(profileShape).isRequired,
};

const AuthorConfig = ({ profiles }) => (
  <div>
    <Field
      name="author"
      component="select"
      validate={[required]}
    >
      <option key="default" value="" disabled>Author</option>
      {map(profiles, profile => (
        <option key={profile.uuid} value={profile.uuid}>{profile.displayName}</option>
      ))}&
    </Field>
  </div>
);

AuthorConfig.propTypes = propTypes;

export default AuthorConfig;
