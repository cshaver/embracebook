import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import AuthorConfig from 'embracebook/components/AuthorConfig';
import { Fieldset, Textarea } from 'embracebook/components/form';
import { required } from 'embracebook/utils/form';
import { NEW_POST_FORM_NAME } from 'embracebook/constants';
import profileShape from 'embracebook/shapes/profile';

const propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  hasAuthorConfig: PropTypes.bool,
  authorProfiles: PropTypes.arrayOf(profileShape),
};

const defaultProps = {
  hasAuthorConfig: false,
  authorProfiles: [],
};

const NewPostForm = ({
  handleSubmit,
  hasAuthorConfig,
  authorProfiles,
}) => (
  <form onSubmit={handleSubmit}>
    <Fieldset label="Post">
      {hasAuthorConfig && <AuthorConfig profiles={authorProfiles} />}
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

NewPostForm.propTypes = propTypes;
NewPostForm.defaultProps = defaultProps;

export default (reduxForm({
  form: NEW_POST_FORM_NAME,
  onSubmitSuccess: function resetForm(result, dispatch, formProps) {
    formProps.reset();
  },
})(NewPostForm));
