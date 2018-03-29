import React from 'react';
import { noop } from 'lodash';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

import { storiesOf } from '@storybook/react';

import Comment from 'embracebook/components/Comment';
import store from '../src/configureStore';

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

const SAMPLE_AUTHOR_PROFILES = [
  {
    avatarUrl: 'https://api.adorable.io/avatars/test-profile.png',
    createdBy: '7JKjBI1STJM86AmOSPuVpecYQ2x2',
    displayName: 'Test Profile',
    slug: 'test-profile',
    uuid: '-L4ADB0VTBVd-d8yYQsQ'
  },
  {
    avatarUrl: 'https://api.adorable.io/avatars/second-profile.png',
    createdBy: 'MZOf8gvnbfRnuOJn7nTw9USw5K63',
    displayName: 'Second Profile',
    slug: 'second-profile',
    uuid: '-L5N4SpKAZ1wM8iS9Kv2'
  },
  {
    avatarUrl: 'https://api.adorable.io/avatars/third-profile.png',
    createdBy: 'MZOf8gvnbfRnuOJn7nTw9USw5K63',
    displayName: 'Third Profile',
    slug: 'third-profile',
    uuid: '-L5N4UpucxhA6K11X7AK',
  },
];

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
