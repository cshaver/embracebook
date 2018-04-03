import React from 'react';
import { noop } from 'lodash';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

import { storiesOf } from '@storybook/react';

import Comment from '../app/components/Comment';
import store from '../app/configureStore';

const SAMPLE_COMMENT = {
  author: {
    avatarUrl: 'https://api.adorable.io/avatars/test-profile.png',
    createdBy: '7JKjBI1STJM86AmOSPuVpecYQ2x2',
    displayName: 'Test Profile',
    slug: 'test-profile',
  },
  content: 'aoeuoeu',
  createdBy: '7JKjBI1STJM86AmOSPuVpecYQ2x2',
  timestamp: '2018-03-10T06:14:04.444Z',
  uid: '-L7DXr_srxNfSDIQA7XG',
};

storiesOf('Comment', module)
  .addDecorator(story => <Provider store={store}><MemoryRouter>{story()}</MemoryRouter></Provider>)
  .add('default', () => (
    <Comment
      comment={SAMPLE_COMMENT}
      user="123"
      showDelete={false}
    />
  ))
  .add('with delete', () => (
    <Comment
      comment={SAMPLE_COMMENT}
      user="123"
      onDelete={noop}
      showDelete
    />
  ));
