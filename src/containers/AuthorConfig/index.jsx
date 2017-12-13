import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { firebaseConnect, isEmpty } from 'react-redux-firebase';
import { map } from 'lodash';

import { required } from '../../utils/form';
import { NPC_TYPE } from '../../constants';

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

export default compose(
  firebaseConnect([
    { path: 'profiles' },
  ]),
  connect(
    // map state to props
    ({ firebase, firebase: { data: { profiles } } }, { params }) => (
      {
        profiles: map((profiles || []), (profile, uid) => ({
          ...profile,
          uid,
        })).reverse(),
      }
    )),
)(AuthorConfig);
