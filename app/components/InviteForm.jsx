import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import { reduce } from 'lodash';

import ShowIfAdmin from './ShowIfAdmin';
import Field from './form/Field';
import Button from './form/Button';
import { validateEmail } from '../utils/form';

function validateInvitation(values) {
  const { roles } = values;

  const errors = {};
  const anyRole = reduce(roles, (result, val, key) => (val && key) || result);

  if (!roles || !anyRole) {
    errors.roles = {
      player: 'Please choose at least one role.',
    };
  }

  return errors;
}

const propTypes = {
  onInvite: PropTypes.func.isRequired,
};

const InviteForm = ({ onInvite }) => (
  <Form
    validate={validateInvitation}
    onSubmit={(values, { reset }) => onInvite(values).then(reset)}
    render={({ handleSubmit, submitting }) => (
      <form onSubmit={handleSubmit}>
        <Field component="input" type="email" validate={validateEmail} name="email" label="Email" />

        <ShowIfAdmin>
          <Field component="input" type="checkbox" label="Admin?" name="roles.admin" />
        </ShowIfAdmin>
        <Field component="input" type="checkbox" label="Storyteller?" name="roles.storyteller" />
        <Field component="input" type="checkbox" label="Player?" name="roles.player" />

        <Button type="submit" disabled={submitting} copy="Invite" />
      </form>
    )}
  />
);

InviteForm.propTypes = propTypes;

export default InviteForm;
