import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';

import AuthorConfig from '../components/AuthorConfig';
import Button from '../components/form/Button';
import { required } from '../utils/form';
// import profileShape from '../shapes/profile';

const propTypes = {
  // onSubmit: PropTypes.func.isRequired,
  hasAuthorConfig: PropTypes.bool,
  // authorProfiles: PropTypes.arrayOf(profileShape),
};

const defaultProps = {
  hasAuthorConfig: false,
  // authorProfiles: [],
};

// const NewPostForm = ({ onSubmit, hasAuthorConfig, authorProfiles }) => (
class NewPostForm extends React.Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    console.log('onsubmit');
  }

  render() {
    const { hasAuthorConfig } = this.props;

    return (
      <Form
        onSubmit={(values, { reset }) => this.onSubmit(values).then(reset)}
        render={({ handleSubmit, reset, submitting }) => (
          <form onSubmit={event => handleSubmit(event).then(reset)}>
            {hasAuthorConfig && <AuthorConfig profiles={/* authorProfiles */ null} />}
            <Field name="content" component="textarea" placeholder="..." validate={required} />
            <Button type="submit" disabled={submitting} copy="Post" />
          </form>
        )}
      />
    );
  }
}

NewPostForm.propTypes = propTypes;
NewPostForm.defaultProps = defaultProps;

export default NewPostForm;
