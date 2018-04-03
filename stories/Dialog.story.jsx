import React from 'react';
// import { Provider } from 'react-redux';
// import { MemoryRouter } from 'react-router';

import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';

import Dialog from '../app/components/Dialog';

storiesOf('Dialog', module)
  // .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add('with text', () => (
    <Dialog open title="My title">
      <p>Some text</p>
    </Dialog>
  ));
