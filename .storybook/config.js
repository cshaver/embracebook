import { configure } from '@storybook/react';

import ThemedStyleSheet from 'react-with-styles/lib/ThemedStyleSheet';
import aphroditeInterface from 'react-with-styles-interface-aphrodite';
import { css, withStyles } from 'react-with-styles';

import '../src/styles/main.scss';
import Theme from '../src/components/utils/Theme';

ThemedStyleSheet.registerTheme(Theme);
ThemedStyleSheet.registerInterface(aphroditeInterface);

const req = require.context('../stories', true, /\.story\.(js|jsx)$/)

function loadStories() {
  req.keys().forEach(console.log)
  req.keys().forEach((filename) => req(filename))
}

configure(loadStories, module);
