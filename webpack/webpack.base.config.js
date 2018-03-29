/* eslint-disable import/no-extraneous-dependencies */

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const project = require('./project.config');

const inProject = path.resolve.bind(path, project.basePath);
const inProjectSrc = file => inProject(project.srcDir, file);

const DEV = project.env === 'development';

// see https://webpack.js.org/configuration/
module.exports = (options = {}) => ({
  ...options,

  entry: [
    'babel-polyfill',
    ...options.entry,
    inProjectSrc(project.main),
  ],

  output: {
    path: inProject(project.outDir),
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
    publicPath: inProject(project.publicPath),
    ...options.output,
  },

  module: {
    rules: [
      // javascript
      {
        test: /\.(js|jsx)$/,
        exclude: [
          /node_modules/,
        ],
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },

      // css
      {
        test: /\.(css|sass|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              sourceMap: DEV,
              importLoaders: 2,
              minimize: {
                autoprefixer: {
                  add: true,
                  remove: true,
                  browsers: ['last 2 versions'],
                },
                discardComments: {
                  removeAll: true,
                },
                discardUnused: false,
                mergeIdents: false,
                reduceIdents: false,
                safe: true,
                sourcemap: DEV,
              },
            },
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: DEV,
              includePaths: [inProjectSrc('styles')],
            },
          }],
        }),
      },

      // images
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
        },
      },
    ],
  },

  resolve: {
    modules: ['node_modules'],
    extensions: ['*', '.js', '.jsx', '.json'],
    alias: {
      // fix issue of loading multiple versions of react
      react: path.resolve('./node_modules/react'),
      embracebook: inProject(project.srcDir),
      '@embracebook': inProject(project.srcDir),
      '@': inProject(project.srcDir),
    },
  },

  plugins: [
    // ignore moment locales
    // https://github.com/moment/moment/issues/2373
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // css
    new ExtractTextPlugin({
      filename: 'styles/[name].[contenthash].css',
      allChunks: true,
      disable: DEV,
    }),

    // html template
    new HtmlWebpackPlugin({
      template: inProjectSrc('index.html'),
      inject: true,
      minify: {
        collapseWhitespace: true,
      },
    }),

    ...options.plugins,
  ],
});
