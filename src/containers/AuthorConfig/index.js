import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { required, validateSlug } from 'utils/form'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { map } from 'lodash'

@firebaseConnect([
  { path: 'profiles' }
])
@connect(
  // map state to props
  ({ firebase, firebase: { data: { profiles } } }, { params }) => (
    {
      profiles: map((profiles || []), (profile, uid) => ({
        ...profile,
        uid
        })).reverse()
    }
  )
)
export default class AuthorConfig extends Component {
  render() {
    const { profiles } = this.props
    return (
      <div>
        <Field
          name="author"
          component="select"
          validate={[required]}
        >
          <option value="" disabled>Author</option>
          {!isEmpty(profiles) &&
            map(profiles, (profile) => (
              <option key={profile.uid} value={profile.uid}>{profile.displayName}</option>
            ))}
        </Field>
      </div>
    )
  }
}