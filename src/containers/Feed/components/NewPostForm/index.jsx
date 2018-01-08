import React from 'react';
// import { compose } from 'redux';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import AuthorConfig from 'embracebook/containers/AuthorConfig';
import { Fieldset, Textarea } from 'embracebook/components/form';
import { required } from 'embracebook/utils/form';
import { NEW_POST_FORM_NAME } from 'embracebook/constants';

class NewPostForm extends React.Component {
  resetForm(result, dispatch, formProps) {
    formProps.reset();
  }

  render() {
    const {
      open, onRequestClose, submit, handleSubmit, hasAuthorConfig,
    } = this.props;
    return (
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
  }
}

NewPostForm.propTypes = {
  onSubmit: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
  handleSubmit: PropTypes.func.isRequired, // added by redux-form
  submit: PropTypes.func.isRequired, // added by redux-form
};

export default (NewPostForm = reduxForm({
  form: NEW_POST_FORM_NAME,
  onSubmitSuccess: function resetForm(result, dispatch, formProps) {
    formProps.reset();
  },
})(NewPostForm));
