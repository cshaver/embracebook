import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, formValueSelector, reduxForm } from 'redux-form';

import AuthorConfig from 'embracebook/components/AuthorConfig';
import TextInput from 'embracebook/components/form/TextInput';
import { required } from 'embracebook/utils/form';
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

const NewCommentForm = ({ handleSubmit, hasAuthorConfig, authorProfiles }) => (
  <form onSubmit={handleSubmit}>
    {hasAuthorConfig && <AuthorConfig profiles={authorProfiles} />}
    <Field
      name="content"
      component={TextInput}
      validate={[required]}
      props={{ label: 'Comment' }}
    />
    <button type="submit">Submit</button>
  </form>
);

NewCommentForm.propTypes = propTypes;
NewCommentForm.defaultProps = defaultProps;

export default connect(state => ({
  author: formValueSelector('authorConfig')(state, 'author'),
}))(reduxForm({})(NewCommentForm));

