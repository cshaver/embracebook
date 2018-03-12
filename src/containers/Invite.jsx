import React from 'react';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { Form } from 'react-final-form';
import { reduce } from 'lodash';

import ShowIfAdmin from 'embracebook/components/ShowIfAdmin';
import { userIsStoryteller } from 'embracebook/utils/components';
import Field from 'embracebook/components/form/Field';
import { validateEmail } from 'embracebook/utils/form';

import firebaseShape from 'embracebook/shapes/firebase';

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
  firebase: firebaseShape.isRequired,
};

class Invite extends React.Component {
  constructor() {
    super();

    this.inviteUser = this.inviteUser.bind(this);
  }

  inviteUser(values) {
    const { firebase } = this.props;
    const { email, roles } = values;

    return firebase.pushWithMeta('invites', {
      email,
      roles,
    }).then(() => {
      console.log('invite complete');
    });
  }

  render() {
    return (
      <Form
        validate={validateInvitation}
        onSubmit={(values, { reset }) => this.inviteUser(values).then(reset)}
        render={({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit}>
            <Field component="input" type="email" validate={validateEmail} name="email" label="Email" />

            <ShowIfAdmin>
              <Field component="input" type="checkbox" label="Admin?" name="roles.admin" />
            </ShowIfAdmin>
            <Field component="input" type="checkbox" label="Storyteller?" name="roles.storyteller" />
            <Field component="input" type="checkbox" label="Player?" name="roles.player" />

            <button type="submit" disabled={submitting}>Invite</button>
          </form>
        )}
      />
    );
  }
}

Invite.propTypes = propTypes;

export default compose(
  firebaseConnect(),
  userIsStoryteller,
)(Invite);
