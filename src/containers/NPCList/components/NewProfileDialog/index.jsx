import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, formValueSelector, reduxForm } from 'redux-form';

import Dialog from 'embracebook/components/Dialog';
import TextInput from 'embracebook/components/form/TextInput';
import { required, validateSlug } from 'embracebook/utils/form';
import { NEW_PROFILE_FORM_NAME } from 'embracebook/constants';

const NewProfileDialog = ({
  open,
  onRequestClose,
  onSubmit,
  avatarUrl,
}) => (
  <Dialog
    title="New Profile"
    open={open}
    onRequestClose={onRequestClose}
  >
    <form action="dialog" onSubmit={onSubmit}>
      <Field
        name="displayName"
        component={TextInput}
        validate={[required]}
        props={{
          label: 'Display Name',
        }}
      />
      <Field
        name="slug"
        component={TextInput}
        validate={[required, validateSlug]}
        props={{
          label: 'Slug',
        }}
      />
      <Field
        name="avatarUrl"
        component={TextInput}
        validate={[required]}
        props={{
          label: 'Avatar Url',
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
);

NewProfileDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  avatarUrl: PropTypes.string,
};

NewProfileDialog.defaultProps = {
  avatarUrl: '',
};

export default connect(state => ({
  avatarUrl: formValueSelector('newProfile')(state, 'avatarUrl'),
}))(reduxForm({
  form: NEW_PROFILE_FORM_NAME,
})(NewProfileDialog));
