/* eslint-disable import/no-extraneous-dependencies */

const DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = require('./webpack.base.config.js')({
  mode: 'development',

  devtool: 'source-map',

  entry: [],

  output: {
    filename: '[name].js',
  },

  plugins: [
    // webpack-dashboard
    new DashboardPlugin(),
  ],
});
