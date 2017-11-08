import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { map, get } from 'lodash'
import { connect } from 'react-redux'
import {
  firebaseConnect,
  isEmpty
} from 'react-redux-firebase'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { Field, reduxForm } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import { required, validateSlug } from 'utils/form'
import { NEW_POST_FORM_NAME } from 'constants'

// import { VerboseLogging } from 'utils/logging'

import classes from './NewCommentForm.scss'

// const populates = [{ child: 'createdBy', root: 'users', keyProp: 'uid' }]

// @VerboseLogging
export class NewCommentForm extends Component {
  state = {
    value: 2
  }

  onSubmitSuccess() {
    console.log('success!')
  }

  render() {
    const {
      handleSubmit,
      profiles
    } = this.props

    return (
      <form onSubmit={handleSubmit} className={classes.inputs}>
        <Field
          name="author"
          component="select"
          validate={[required]}
        >
          <option value="" disabled>Author</option>
          {!isEmpty(profiles) &&
            map(profiles, (profile, key) => (
              <option key={key} value={key}>{profile.displayName}</option>
            ))}
        </Field>
        <Field
          name="content"
          component={TextField}
          floatingLabelText="Content"
          validate={[required]}
          props={{
            fullWidth: true,
            multiLine: true,
            rows: 1
          }}
        />
        <FlatButton label="Submit" type="submit" primary />,
      </form>
    )
  }

  static propTypes = {
    onSubmit: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
  }
}

export default NewCommentForm = reduxForm({})(NewCommentForm)
