const path = require('path');
const { version } = require('../../package.json');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  version,

  // The environment to use when building the project
  env: NODE_ENV,

  // The full path to the project's root directory
  basePath: path.join(__dirname, '../..'),

  // The name of the directory containing the application source code
  srcDir: 'src',

  // The file name of the application's entry point
  main: 'main',

  // The name of the directory in which to emit compiled assets
  outDir: 'public',

  // directory containing static assets
  staticDir: 'src/public',

  // The base path for all projects assets (relative to the website root)
  publicPath: '/',

  // Whether to generate sourcemaps
  sourcemaps: NODE_ENV === 'development',

  // The list of modules to bundle separately from the core application code
  // vendors: [
  //   'firebaseui',
  //   'react',
  //   'react-dom',
  //   'react-redux',
  //   'react-redux-firebase',
  //   'react-router-dom',
  //   'redux',
  //   'redux-thunk',
  // ],

  /**
   * Settings used to create src/config.js using firebase-ci
   * in ci environment. If you are running locally, go to src/config.js.
   */
  firebase: {
    apiKey: 'AIzaSyAI0oXPjn2jHFezom3LjA39mSpAcKEgmus',
    authDomain: 'embracebook-e403d.firebaseapp.com',
    databaseURL: 'https://embracebook-e403d.firebaseio.com',
    storageBucket: 'embracebook-e403d.appspot.com',
  },

  reduxFirebase: {
    userProfile: 'users',
    enableLogging: false,
    updateProfileOnLogin: true,
  },
};
