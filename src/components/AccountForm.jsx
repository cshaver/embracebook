import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';

import Field from 'embracebook/components/form/Field';

const propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
};

const defaultProps = {
  initialValues: {},
};

const AccountForm = ({ onSubmit, initialValues }) => (
  <Form
    onSubmit={(values, { reset }) => onSubmit(values).then(reset)}
    initialValues={initialValues}
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
AccountForm.defaultProps = defaultProps;

export default AccountForm;

