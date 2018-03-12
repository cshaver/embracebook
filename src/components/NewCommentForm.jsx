import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';

import AuthorConfig from 'embracebook/components/AuthorConfig';
import Field from 'embracebook/components/form/Field';
import { required } from 'embracebook/utils/form';
import profileShape from 'embracebook/shapes/profile';

const propTypes = {
  onSubmit: PropTypes.func.isRequired,
  hasAuthorConfig: PropTypes.bool,
  authorProfiles: PropTypes.arrayOf(profileShape),
};

const defaultProps = {
  hasAuthorConfig: false,
  authorProfiles: [],
};

const NewCommentForm = ({ onSubmit, hasAuthorConfig, authorProfiles }) => (
  <Form
    onSubmit={(values, { reset }) => onSubmit(values).then(reset)}
    render={({ handleSubmit, submitting }) => (
      <form onSubmit={handleSubmit}>
        {hasAuthorConfig && <AuthorConfig profiles={authorProfiles} />}
        <Field label="Content" name="content" component="input" type="text" validate={required} />
        <button type="submit" disabled={submitting}>Comment</button>
      </form>
    )}
  />
);

NewCommentForm.propTypes = propTypes;
NewCommentForm.defaultProps = defaultProps;

export default NewCommentForm;

