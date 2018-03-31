const path = require('path');
const { version } = require('../package.json');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  version,

  // The environment to use when building the project
  env: NODE_ENV,

  // The full path to the project's root directory
  basePath: path.join(__dirname, '..'),

  // The name of the directory containing the application source code
  srcDir: 'app',

  // The file name of the application's entry point
  main: 'index',

  // The name of the directory in which to emit compiled assets
  outDir: 'public',

  // directory containing static assets
  staticDir: 'app/public',

  // The base path for all projects assets (relative to the website root)
  publicPath: '/',

  // Whether to generate sourcemaps
  sourcemaps: NODE_ENV === 'development',
};
