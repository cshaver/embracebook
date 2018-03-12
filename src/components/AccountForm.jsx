import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';

import Field from 'embracebook/components/form/Field';

const propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

const AccountForm = ({ onSubmit }) => (
  <Form
    onSubmit={(values, { reset }) => onSubmit(values).then(reset)}
    render={({ handleSubmit, submitting }) => (
      <form onSubmit={handleSubmit}>
        <h4>Account</h4>
        <Field component="input" type="text" name="displayName" label="Display Name" />
        <Field component="input" type="text" name="email" label="Email" />
        <Field component="input" type="text" name="avatarUrl" label="Avatar Url" />
        <button type="submit" disabled={submitting}>Save</button>
      </form>
    )}
  />
);

AccountForm.propTypes = propTypes;

export default AccountForm;

