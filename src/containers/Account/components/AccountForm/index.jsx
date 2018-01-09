import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import TextInput from 'embracebook/components/form/TextInput';
import { ACCOUNT_FORM_NAME } from 'embracebook/constants';

const AccountForm = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <h4>Account</h4>
    <Field
      name="displayName"
      component={TextInput}
      props={{ label: 'Display Name' }}
    />
    <Field
      name="email"
      component={TextInput}
      props={{ label: 'Email' }}
    />
    <Field
      name="avatarUrl"
      component={TextInput}
      props={{ label: 'Avatar Url' }}
    />
    <button type="submit">Save</button>
  </form>
);

AccountForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: ACCOUNT_FORM_NAME,
})(AccountForm);

