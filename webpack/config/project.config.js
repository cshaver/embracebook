const path = require('path');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
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
  // The base path for all projects assets (relative to the website root)
  publicPath: '/',
  // Whether to generate sourcemaps
  sourcemaps: NODE_ENV === 'development',
  // A hash map of keys that the compiler should treat as external to the project
  externals: {},
  // A hash map of variables and their values to expose globally
  globals: {},
  // Whether to enable verbose logging
  verbose: false,
  // The list of modules to bundle separately from the core application code
  vendors: [
    'react',
    'react-dom',
    'redux',
    'react-redux',
    'redux-thunk',
    'react-router',
    'react-redux-firebase',
    'firebaseui',
  ],
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
    // root that user profiles are written to
    userProfile: 'users',
    // enable/disable Firebase Database Logging
    enableLogging: false,
    // enable/disable updating of profile on login
    updateProfileOnLogin: false,
  },
};
