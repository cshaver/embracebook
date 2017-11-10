import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { map, get } from 'lodash'
import { connect } from 'react-redux'
import {
  firebaseConnect,
  isEmpty
} from 'react-redux-firebase'
import { Field, reduxForm } from 'redux-form'

import { Fieldset, TextInput } from 'components/Form'
import { required, validateSlug } from 'utils/form'
import { NEW_POST_FORM_NAME } from 'constants'

import classes from './index.scss'

export class NewCommentForm extends Component {
  render() {
    const {
      handleSubmit,
      profiles
    } = this.props

    return (
      <form onSubmit={handleSubmit} className={classes.inputs}>
        <Fieldset label="Comment">
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
            component={TextInput}
            floatingLabelText="Content"
            validate={[required]}
          />
          <button type="submit">Submit</button>
        </Fieldset>
      </form>
    )
  }

  static propTypes = {
    onSubmit: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
  }
}

export default NewCommentForm = reduxForm({})(NewCommentForm)
