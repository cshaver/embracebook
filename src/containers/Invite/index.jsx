import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { Field, reduxForm } from 'redux-form';
import { reduce } from 'lodash';

import ShowIfAdmin from 'embracebook/components/ShowIfAdmin';
import { userIsStoryteller } from 'embracebook/utils/components';
import { TextInput, Checkbox } from 'embracebook/components/form';
import { required, validateEmail } from 'embracebook/utils/form';

import firebaseShape from 'embracebook/shapes/firebase';

class Invite extends React.Component {
  constructor() {
    super();

    this.inviteUser = this.inviteUser.bind(this);
  }

  inviteUser(values) {
    const { firebase, reset } = this.props;
    const { email, roles } = values;

    return firebase.pushWithMeta('invites', {
      email,
      roles,
    }).then(() => {
      console.log('invite complete');
      reset();
    });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.inviteUser)}>
        <Field component={TextInput} validate={[required, validateEmail]} name="email" type="email" label="Email" />

        <ShowIfAdmin>
          <Field component={Checkbox} type="checkbox" label="Admin?" id="admin" name="roles.admin" />
        </ShowIfAdmin>
        <Field component={Checkbox} type="checkbox" label="Storyteller?" id="storyteller" name="roles.storyteller" />
        <Field component={Checkbox} type="checkbox" label="Player?" id="player" name="roles.player" />

        <button type="submit">Invite</button>
      </form>
    );
  }
}

Invite.propTypes = {
  firebase: firebaseShape.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

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

export default compose(
  firebaseConnect(),
  userIsStoryteller,
  reduxForm({
    form: 'contact',
    validate: validateInvitation,
  }),
)(Invite);
