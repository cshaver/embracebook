/* eslint-disable import/no-extraneous-dependencies */
const DashboardPlugin = require('webpack-dashboard/plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = require('./webpack.base.config.js')({
  mode: 'development',

  devtool: 'source-map',

  entry: [],

  output: {},

  plugins: [
    // webpack-dashboard
    new DashboardPlugin(),
    // bundle analyser at http://localhost:8888/
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
    }),
  ],
});
