import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';

import AuthorConfig from './AuthorConfig';
import Button from './form/Button';
import { required } from '../utils/form';
import profileShape from '../shapes/profile';

const propTypes = {
  onSubmit: PropTypes.func.isRequired,
  hasAuthorConfig: PropTypes.bool,
  authorProfiles: PropTypes.arrayOf(profileShape),
};

const defaultProps = {
  hasAuthorConfig: false,
  authorProfiles: [],
};

const NewPostForm = ({ onSubmit, hasAuthorConfig, authorProfiles }) => (
  <Form
    onSubmit={(values, { reset }) => onSubmit(values).then(reset)}
    render={({ handleSubmit, reset, submitting }) => (
      <form onSubmit={event => handleSubmit(event).then(reset)}>
        {hasAuthorConfig && <AuthorConfig profiles={authorProfiles} />}
        <Field name="content" component="textarea" placeholder="..." validate={required} />
        <Button type="submit" disabled={submitting} copy="Post" />
      </form>
    )}
  />
);

NewPostForm.propTypes = propTypes;
NewPostForm.defaultProps = defaultProps;

export default NewPostForm;
