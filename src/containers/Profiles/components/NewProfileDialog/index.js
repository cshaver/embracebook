import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { Field, formValueSelector, reduxForm } from 'redux-form'
import { TextField } from 'redux-form-material-ui'

import { required, validateSlug } from 'utils/form'
import { NEW_PROFILE_FORM_NAME } from 'constants'

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
      submit,
      handleSubmit,
      avatarUrl
    } = this.props

    return (
      <Dialog
        title="New Profile"
        open={open}
        onRequestClose={onRequestClose}
        contentClassName={classes.container}
        actions={[
          <FlatButton label="Cancel" secondary onClick={onRequestClose} />,
          <FlatButton label="Create" primary onClick={submit} />
        ]}>
        <form onSubmit={handleSubmit} className={classes.inputs}>
          <Field
            name="displayName"
            component={TextField}
            floatingLabelText="Display Name"
            validate={[required]}
          />
          <Field
            name="slug"
            component={TextField}
            validate={[required, validateSlug]}
            floatingLabelText="Slug"
          />
          <Field
            name="avatarUrl"
            component={TextField}
            floatingLabelText="Avatar Url"
            validate={[required]}
          />
          {
            avatarUrl &&
            (<div><img src={avatarUrl} style={{ maxWidth: '180px', margin: '1em auto', display: 'block' }} alt="" /></div>)
          }
        </form>
      </Dialog>
    )
  }

  static propTypes = {
    open: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
    handleSubmit: PropTypes.func.isRequired, // added by redux-form
    submit: PropTypes.func.isRequired // added by redux-form
  }
}

export default NewProfileDialog = reduxForm({
  form: NEW_PROFILE_FORM_NAME,
})(NewProfileDialog)
