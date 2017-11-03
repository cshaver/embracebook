import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { Field, reduxForm } from 'redux-form'
import { TextField } from 'redux-form-material-ui'

import { required, validateSlug } from 'utils/form'
import { NEW_PROFILE_FORM_NAME } from 'constants'

// import { VerboseLogging } from 'utils/logging'

import classes from './NewProfileDialog.scss'

// @VerboseLogging
export class NewProfileDialog extends Component {
  render() {
    const {
      open,
      onRequestClose,
      submit,
      handleSubmit,
    } = this.props

    return (
      <Dialog
        title="New Profile"
        open={open}
        onRequestClose={onRequestClose}
        contentClassName={classes.container}
        actions={[
          <FlatButton label="Cancel" secondary onTouchTap={onRequestClose} />,
          <FlatButton label="Create" primary onTouchTap={submit} />
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

NewProfileDialog = reduxForm({
  form: NEW_PROFILE_FORM_NAME
})(NewProfileDialog)

export default connect(
  ({ form: { newProfile: { initialValues } } }) => ({ initialValues })
)(NewProfileDialog)
