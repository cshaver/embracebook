import React from 'react';
import PropTypes from 'prop-types';
// import { map, get } from 'lodash';
import { connect } from 'react-redux';
// import { firebaseConnect, isEmpty } from 'react-redux-firebase';
import { Field, formValueSelector, reduxForm } from 'redux-form';

import AuthorConfig from 'embracebook/containers/AuthorConfig';
import TextInput from 'embracebook/components/form/TextInput';
import { required } from 'embracebook/utils/form';
// import { NEW_POST_FORM_NAME } from 'embracebook/constants';

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
  onSubmit: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
};

export default connect(state => ({
  author: formValueSelector('authorConfig')(state, 'author'),
}))(reduxForm({})(NewCommentForm));

