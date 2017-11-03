import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { Field, reduxForm } from 'redux-form'
import { TextField } from 'redux-form-material-ui'

import { required, validateSlug } from 'utils/form'
import { NEW_POST_FORM_NAME } from 'constants'

// import { VerboseLogging } from 'utils/logging'

import classes from './NewPostDialog.scss'

// @VerboseLogging
export class NewPostDialog extends Component {
  render() {
    const {
      open,
      onRequestClose,
      submit,
      handleSubmit,
      newPost
    } = this.props

    return (
      <Dialog
        title="New Post"
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
          {
            newPost.values && newPost.values.avatarUrl &&
            (<div><img src={newPost.values.avatarUrl} style={{ maxWidth: '180px', margin: '1em auto', display: 'block' }} alt="" /></div>)
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

NewPostDialog = reduxForm({
  form: NEW_POST_FORM_NAME
})(NewPostDialog)

export default connect(
  ({ form: { newPost, newPost: { initialValues, values } } }) => ({ initialValues, newPost })
)(NewPostDialog)
