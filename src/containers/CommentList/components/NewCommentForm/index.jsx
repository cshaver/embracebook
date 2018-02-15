import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, formValueSelector, reduxForm } from 'redux-form';

import AuthorConfig from 'embracebook/components/AuthorConfig';
import TextInput from 'embracebook/components/form/TextInput';
import { required } from 'embracebook/utils/form';

const NewCommentForm = ({ handleSubmit, hasAuthorConfig }) => (
  <form onSubmit={handleSubmit}>
    {hasAuthorConfig ? <AuthorConfig /> : null}
    <Field
      name="content"
      component={TextInput}
      validate={[required]}
      props={{ label: 'Comment' }}
    />
    <button type="submit">Submit</button>
  </form>
);

NewCommentForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
  hasAuthorConfig: PropTypes.bool,
};

NewCommentForm.defaultProps = {
  hasAuthorConfig: false,
};

export default connect(state => ({
  author: formValueSelector('authorConfig')(state, 'author'),
}))(reduxForm({})(NewCommentForm));

