const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = require('./webpack.base.config.js')({
  mode: 'production',

  entry: [],

  output: {},

  plugins: [
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
    }),
  ],
});
