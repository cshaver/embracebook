import React, { Component } from 'react';
// import { compose } from 'redux';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import AuthorConfig from '../../../../containers/AuthorConfig';
import { Fieldset, Textarea } from '../../../../components/form';
import { required } from '../../../../utils/form';
import { NEW_POST_FORM_NAME } from '../../../../constants';

import classes from './index.scss';

class NewPostForm extends Component {
  resetForm(result, dispatch, formProps) {
    formProps.reset();
  }

  render() {
    const {
      open, onRequestClose, submit, handleSubmit, hasAuthorConfig,
    } = this.props;
    return (
      <form onSubmit={handleSubmit} className={classes.inputs}>
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
