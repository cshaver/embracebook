const BREAKPOINT_WIDTHS = {
  large: 1024,
  medium: 768,
  small: 425,
};

const breakpoint = {
  large: `@media(min-width: ${BREAKPOINT_WIDTHS.large})`,
  medium: `@media(min-width: ${BREAKPOINT_WIDTHS.medium})`,
  small: `@media(max-width: ${BREAKPOINT_WIDTHS.small - 1})`,
};

// colors from dracula:
// https://github.com/dracula/dracula-theme
const color = {
  foreground: '#f8f8f2',
  background: '#282a36',
  primary: '#44475a',
  highlight: '#6272a4',
  cyan: '#8be9fd',
  green: '#50fa7b',
  orange: '#ffb86c',
  pink: '#ff79c6',
  purple: '#bd93f9',
  red: '#ff5555',
  yellow: '#f1fa8c',

  // green theme?
  // page: '#0a1416',
  // primary: '#32932e',
  // dimmed: '#32932e',
  // secondary: '#152f34',
};

export default {
  color: {
    ...color,
    // color aliases
    page: color.background,
    dimmed: color.highlight,
    copy: color.foreground,
    link: color.cyan,
    error: color.red,
  },
  breakpoint,
};
