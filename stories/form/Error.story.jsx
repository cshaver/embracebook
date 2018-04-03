import React from 'react';
// import { Provider } from 'react-redux';
// import { MemoryRouter } from 'react-router';
import { storiesOf } from '@storybook/react';
import { Form } from 'react-final-form';
import { noop } from 'lodash';
// import { action } from '@storybook/addon-actions';

import Field from '../../app/components/form/Field';

const alwaysFail = () => 'Oops!';

storiesOf('Error', module)
  .add('default', () => (
    <Form
      onSubmit={noop}
      render={() => (
        <Field label="Label" name="foo" component="input" type="text" validate={alwaysFail} />
      )}
    />
  ));
