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

import classes from './NewPostDialog.scss'

// const populates = [{ child: 'createdBy', root: 'users', keyProp: 'uid' }]

// @VerboseLogging
export class NewPostDialog extends Component {
  state = {
    value: 2
  }

  render() {
    const {
      open,
      onRequestClose,
      submit,
      handleSubmit,
      profiles
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
            name="author"
            component="select"
            // component={() => (
              // <DropDownMenu onChange={this.handleChange}>
              //   <MenuItem value="" label="Choose..." primaryText="Choose..." />
              //   <MenuItem value={1} label="5 am - 12 pm" primaryText="Morning" />
              //   <MenuItem value={2} label="12 pm - 5 pm" primaryText="Afternoon" />
              //   <MenuItem value={3} label="5 pm - 9 pm" primaryText="Evening" />
              //   <MenuItem value={4} label="9 pm - 5 am" primaryText="Night" />
              // </DropDownMenu>
            // )}
            // floatingLabelText="Author"
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

export default NewPostDialog = reduxForm({
  form: NEW_POST_FORM_NAME
})(NewPostDialog)
