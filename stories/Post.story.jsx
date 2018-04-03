import React from 'react';
import { noop } from 'lodash';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

import { storiesOf } from '@storybook/react';

import Post from '../app/components/Post';
import store from '../app/configureStore';

const SAMPLE_POST = {
  author: {
    avatarUrl: 'https://78.media.tumblr.com/9c6f25b7360bb0df56eb400cfb675329/tumblr_n2wd8qsnii1tw5bhko1_400.gif',
    displayName: 'Player Acct',
    email: 'cristina.shaver+player@gmail.com',
    roles: {
      player: true,
    },
    uid: 'qgS3ZwdPwEZYBwPyJTtSYfTYJis1',
  },
  content: 'playa',
  createdBy: 'qgS3ZwdPwEZYBwPyJTtSYfTYJis1',
  timestamp: '2018-03-16T06:28:10.897Z',
  uid: '-L7hUcjg1UArToJiKRjG',
  comments: [
    {
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
    },
    {
      author: {
        avatarUrl: 'https://api.adorable.io/avatars/test-profile.png',
        createdBy: '7JKjBI1STJM86AmOSPuVpecYQ2x2',
        displayName: 'Test Profile',
        slug: 'test-profile',
      },
      content: 'oeuau',
      createdBy: '7JKjBI1STJM86AmOSPuVpecYQ2x2',
      timestamp: '2018-03-10T06:14:07.466Z',
      uid: '-L7DXsK4RDoKzvSDhX9n',
    },
  ],
};

const SAMPLE_AUTHOR_PROFILES = [
  {
    avatarUrl: 'https://api.adorable.io/avatars/test-profile.png',
    createdBy: '7JKjBI1STJM86AmOSPuVpecYQ2x2',
    displayName: 'Test Profile',
    slug: 'test-profile',
    uuid: '-L4ADB0VTBVd-d8yYQsQ',
  },
  {
    avatarUrl: 'https://api.adorable.io/avatars/second-profile.png',
    createdBy: 'MZOf8gvnbfRnuOJn7nTw9USw5K63',
    displayName: 'Second Profile',
    slug: 'second-profile',
    uuid: '-L5N4SpKAZ1wM8iS9Kv2',
  },
  {
    avatarUrl: 'https://api.adorable.io/avatars/third-profile.png',
    createdBy: 'MZOf8gvnbfRnuOJn7nTw9USw5K63',
    displayName: 'Third Profile',
    slug: 'third-profile',
    uuid: '-L5N4UpucxhA6K11X7AK',
  },
];

storiesOf('Post', module)
  .addDecorator(story => <Provider store={store}><MemoryRouter>{story()}</MemoryRouter></Provider>)
  .add('default', () => (
    <Post
      post={SAMPLE_POST}
      user="123"
      showDelete={false}
    />
  ))
  .add('with delete', () => (
    <Post
      post={SAMPLE_POST}
      user="123"
      onDelete={noop}
      showDelete
    />
  ))
  .add('with authorConfig', () => (
    <Post
      post={SAMPLE_POST}
      user="123"
      hasAuthorConfig
      authorProfiles={SAMPLE_AUTHOR_PROFILES}
    />
  ));
