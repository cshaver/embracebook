import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { Field, reduxForm } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import slugify from 'slugify'

import { required, validateSlug } from 'utils/form'
import { NEW_PROFILE_FORM_NAME } from 'constants'

// import SlugField from './SlugField'

import classes from './NewProfileDialog.scss'

export class NewProfileDialog extends Component {
  constructor() {
    super()
    this.updateDefaults = this.updateDefaults.bind(this)
  }

  state = {
    defaultSlug: '',
    defaultAvatar: `https://api.adorable.io/avatars/default.png`
  }

  updateDefaults(event, displayName) {
    // console.group('updateDefaults')

    // console.log(this.state)

    const slug = slugify(displayName)

    this.state.defaultSlug = slug
    this.state.defaultAvatar = `https://api.adorable.io/avatars/${slug}.png`

    // console.log(displayName)
    // console.log(this.state)

    // console.groupEnd()
  }

  render() {
    console.group('NewProfileDialog::render')

    const {
      open,
      onRequestClose,
      submit,
      handleSubmit,
    } = this.props

    const {
      defaultSlug,
      defaultAvatar
    } = this.state

    // console.log(defaultSlug)
    // console.log(defaultAvatar)

    console.groupEnd()
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
          <TextField
            id="text-field-default"
            defaultValue="Default Value"
          /><br />
          <Field
            name="displayName"
            component={TextField}
            floatingLabelText="Display Name"
            validate={[required]}
            onChange={this.updateDefaults}
          />
          <Field
            name="slug"
            component={TextField}
            validate={[required, validateSlug]}
            floatingLabelText="Slug"
            props={
              {
                defaultValue: defaultSlug
              }
            }
          />
          <Field
            name="avatarUrl"
            component={TextField}
            floatingLabelText="Avatar Url"
            validate={[required]}
            props={
              { defaultValue: defaultAvatar }
            }
          />
        </form>
      </Dialog>
    )
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.group('NewProfileDialog::shouldComponentUpdate')
  //   // console.log(nextProps)
  //   console.log(this.state)
  //   console.log(nextState)
  //   console.groupEnd()
  //   return true
  // }

  // componentWillReceiveProps(nextProps) {
  //   console.group('NewProfileDialog::componentWillReceiveProps')
  //   console.log(nextProps)
  //   console.groupEnd()
  // }

  static propTypes = {
    open: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
    handleSubmit: PropTypes.func.isRequired, // added by redux-form
    submit: PropTypes.func.isRequired, // added by redux-form
    defaultSlug: PropTypes.string,
    defaultAvatar: PropTypes.string
  }
}


export default reduxForm({
  form: NEW_PROFILE_FORM_NAME
})(NewProfileDialog)
