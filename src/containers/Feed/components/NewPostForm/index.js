import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { map, get } from 'lodash'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import AuthorConfig from 'containers/AuthorConfig'
import { Fieldset, Textarea } from 'components/Form'
import { required, validateSlug } from 'utils/form'
import { NEW_POST_FORM_NAME } from 'constants'

import classes from './index.scss'

export class NewPostForm extends Component {
  resetForm = (result, dispatch, formProps) => {
    formProps.reset()
  }

  render() {
    const { open, onRequestClose, submit, handleSubmit, hasAuthorConfig } = this.props
    return (
      <form onSubmit={handleSubmit} className={classes.inputs}>
        <Fieldset label="Post">
          {hasAuthorConfig ? <AuthorConfig /> : null}
          <Field
            name="content"
            component={Textarea}
            validate={[required]}
            props={{ placeholder: 'Say something...' }}
          />
          <button type="submit">Post</button>
        </Fieldset>
      </form>
    )
  }

  static propTypes = {
    onSubmit: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
    handleSubmit: PropTypes.func.isRequired, // added by redux-form
    submit: PropTypes.func.isRequired // added by redux-form
  }
}

export default (NewPostForm = reduxForm({
  form: NEW_POST_FORM_NAME,
  onSubmitSuccess: function resetForm(result, dispatch, formProps) {
    formProps.reset()
  }
})(NewPostForm))
