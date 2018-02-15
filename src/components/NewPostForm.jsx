import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import AuthorConfig from 'embracebook/components/AuthorConfig';
import { Fieldset, Textarea } from 'embracebook/components/form';
import { required } from 'embracebook/utils/form';
import { NEW_POST_FORM_NAME } from 'embracebook/constants';

const NewPostForm = ({ handleSubmit, hasAuthorConfig }) => (
  <form onSubmit={handleSubmit}>
    <Fieldset label="Post">
      {hasAuthorConfig ? <AuthorConfig /> : null}
      <Field
        name="content"
        component={Textarea}
        validate={[required]}
        props={{ placeholder: 'Say something...', label: 'Post' }}
      />
      <button type="submit">Post</button>
    </Fieldset>
  </form>
);

NewPostForm.propTypes = {
  // onSubmit: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
  handleSubmit: PropTypes.func.isRequired, // added by redux-form
  // submit: PropTypes.func.isRequired, // added by redux-form
  hasAuthorConfig: PropTypes.bool,
};

NewPostForm.defaultProps = {
  hasAuthorConfig: false,
};

export default (reduxForm({
  form: NEW_POST_FORM_NAME,
  onSubmitSuccess: function resetForm(result, dispatch, formProps) {
    formProps.reset();
  },
})(NewPostForm));
