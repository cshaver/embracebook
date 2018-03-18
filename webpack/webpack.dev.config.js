/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');
const project = require('./project.config');

const inProject = path.resolve.bind(path, project.basePath);

module.exports = require('./webpack.base.config.js')({
  devtool: 'eval',

  devServer: {
    contentBase: inProject(project.staticDir),
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 8080,
    overlay: true,
  },

  entry: [],

  output: {
    filename: '[name].js',
  },

  plugins: [
    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),

    // do not emit compiled assets that include errors
    new webpack.NoEmitOnErrorsPlugin(),

    // webpack-dashboard
    new DashboardPlugin(),
  ],
});
