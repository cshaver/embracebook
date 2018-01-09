import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { firebaseConnect, isEmpty } from 'react-redux-firebase';
import { map } from 'lodash';

import { required } from 'embracebook/utils/form';
import { NPC_TYPE } from 'embracebook/constants';
import profileShape from 'embracebook/shapes/profile';

const AuthorConfig = ({ profiles }) => (
  <div>
    <Field
      name="author"
      component="select"
      validate={[required]}
    >
      <option value="" disabled>Author</option>
      {!isEmpty(profiles) &&
        map(profiles, profile => (
          profile.type !== NPC_TYPE ? null :
          <option key={profile.uid} value={profile.uid}>{profile.displayName}</option>
        ))}
    </Field>
  </div>
);

AuthorConfig.propTypes = {
  profiles: PropTypes.arrayOf(profileShape),
};

AuthorConfig.defaultProps = {
  profiles: [],
};

export default compose(
  firebaseConnect([
    { path: 'profiles' },
  ]),
  connect(({ firebase: { data: { profiles } } }) => (
    {
      profiles: map((profiles || []), (profile, uid) => ({
        ...profile,
        uid,
      })).reverse(),
    }
  )),
)(AuthorConfig);
