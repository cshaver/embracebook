import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, formValueSelector, reduxForm } from 'redux-form'
import Dialog from '../../../components/Dialog'
import TextInput from '../../../components/form/TextInput'

import { required, validateSlug } from '../../../utils/form'
import { NEW_PROFILE_FORM_NAME } from '../../../constants'

import classes from './index.scss'

@connect(
  state => ({
  avatarUrl: formValueSelector('newProfile')(state, 'avatarUrl')
})
)
export class NewProfileDialog extends Component {
  render() {
    const {
      open,
      onRequestClose,
      handleSubmit,
      avatarUrl
    } = this.props

    return (
      <Dialog
        title="New Profile"
        open={open}
        onRequestClose={onRequestClose}
        >
        <form action="dialog" onSubmit={handleSubmit}>
          <Field
            name="displayName"
            component={TextInput}
            validate={[required]}
            props={{
              label: "Display Name"
            }}
          />
          <Field
            name="slug"
            component={TextInput}
            validate={[required, validateSlug]}
            props={{
              label: "Slug"
            }}
          />
          <Field
            name="avatarUrl"
            component={TextInput}
            validate={[required]}
            props={{
              label: "Avatar Url"
            }}
          />
          {
            avatarUrl &&
            (<div><img src={avatarUrl} style={{ maxWidth: '180px', margin: '1em auto', display: 'block' }} alt="" /></div>)
          }
          <button type="button" onClick={onRequestClose}>Cancel</button>
          <button type="submit">Create</button>
        </form>
      </Dialog>
    )
  }
}

NewProfileDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired
}

export default NewProfileDialog = reduxForm({
  form: NEW_PROFILE_FORM_NAME,
})(NewProfileDialog)
