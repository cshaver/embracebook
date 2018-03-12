import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';

import Field from 'embracebook/components/form/Field';
import Dialog from 'embracebook/components/Dialog';
import { required } from 'embracebook/utils/form';

const propTypes = {
  open: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  avatarUrl: PropTypes.string,
};

const defaultProps = {
  avatarUrl: '',
};

const NewProfileDialog = ({ open, onRequestClose, onSubmit, avatarUrl }) => (
  <Dialog
    title="New Profile"
    open={open}
    onRequestClose={onRequestClose}
  >
    <Form
      onSubmit={(values, { reset }) => onSubmit(values).then(reset)}
      render={({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit}>
          <Field component="input" type="text" validate={required} name="displayName" label="Display Name" />
          <Field component="input" type="text" validate={required} name="slug" label="Slug" />
          <Field component="input" type="text" validate={required} name="avatarUrl" label="Avatar Url" />
          {
            avatarUrl &&
            (<div><img src={avatarUrl} style={{ maxWidth: '180px', margin: '1em auto', display: 'block' }} alt="" /></div>)
          }
          <button type="button" onClick={onRequestClose}>Cancel</button>
          <button type="submit" disabled={submitting}>Create</button>
        </form>
      )}
    />
  </Dialog>
);

NewProfileDialog.propTypes = propTypes;
NewProfileDialog.defaultProps = defaultProps;

export default NewProfileDialog;
