/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const webpack = require('webpack');
const loaderUtils = require('loader-utils');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const project = require('./project.config');

const inProject = path.resolve.bind(path, project.basePath);
const inProjectSrc = file => inProject(project.srcDir, file);

const DEV = project.env === 'development';
const TEST = project.env === 'test';
const PROD = project.env === 'production';

const config = {

  devtool: project.sourcemaps ? 'source-map' : false,

  devServer: {
    contentBase: inProject(project.staticDir),
    hot: DEV,
    historyApiFallback: true,
  },

  entry: {
    main: [
      'babel-polyfill',
      'react-hot-loader/patch',
      inProjectSrc(project.main),
    ],
  },

  output: {
    path: inProject(project.outDir),
    filename: DEV ? '[name].js' : '[name].[chunkhash].js',
    publicPath: inProject(project.publicPath),
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

  externals: project.externals,

  plugins: [
    new webpack.DefinePlugin(Object.assign(
      {
        'process.env': { NODE_ENV: JSON.stringify(project.env) },
        DEV,
        TEST,
        PROD,
      },
      project.globals,
    )),
  ],

  node: {
    // disable node constants so constants.js file is used instead
    // (see https://webpack.js.org/configuration/node/)
    constants: false,
  },

  module: {
    rules: [],
  },
};

// JavaScript
// ------------------------------------
config.module.rules.push({
  test: /\.(js|jsx)$/,
  exclude: [
    /node_modules/,
    /react-redux-firebase\/es/,
    /redux-firestore\/es/,
  ],
  use: [
    {
      loader: 'babel-loader',
      query: {
        cacheDirectory: true,
        plugins: [
          'lodash',
          'transform-decorators-legacy',
          // 'babel-plugin-transform-class-properties',
          // 'babel-plugin-syntax-dynamic-import',
          // [
          //   'babel-plugin-transform-runtime',
          //   {
          //     helpers: true,
          //     polyfill: false, // we polyfill needed features in src/normalize.js
          //     regenerator: true
          //   }
          // ],
          // [
          //   'babel-plugin-transform-object-rest-spread',
          //   {
          //     useBuiltIns: true // we polyfill Object.assign in src/normalize.js
          //   }
          // ]
        ],
        // presets: [
        //   'babel-preset-react',
        //   [
        //     'babel-preset-env',
        //     {
        //       targets: {
        //         ie9: true,
        //         uglify: true,
        //         modules: false
        //       }
        //     }
        //   ]
        // ]
      },
    },
  ],
});

// Styles
// ------------------------------------
const extractStyles = new ExtractTextPlugin({
  filename: 'styles/[name].[contenthash].css',
  allChunks: true,
  disable: DEV,
});

config.module.rules.push({
  test: /\.(css|sass|scss)$/,
  loader: extractStyles.extract({
    fallback: 'style-loader',
    use: [
      {
        loader: 'css-loader',
        options: {
          sourceMap: project.sourcemaps,
          modules: true,
          importLoaders: 2,
          localIdentName: '[path][name]__[local]___[hash:base64:5]',
          getLocalIdent: (context, localIdentName, localName) => {
            const hash = loaderUtils.interpolateName(context, '[hash:base64:5]', {
              content: context.resourcePath,
            });
            const parsed = path.parse(context.resourcePath);
            let { name } = parsed;

            if (path.basename(parsed.dir) === 'styles') {
              return localName;
            }

            if (name === 'index') {
              name = path.basename(parsed.dir);
            }

            return `${name}-${localName}--${hash}`;
          },
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
            sourcemap: project.sourcemaps,
          },
        },
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: project.sourcemaps,
          includePaths: [inProjectSrc('styles')],
        },
      },
    ],
  }),
});
config.plugins.push(extractStyles);

// Images
// ------------------------------------
config.module.rules.push({
  test: /\.(png|jpg|gif)$/,
  loader: 'url-loader',
  options: {
    limit: 8192,
  },
});

// Fonts
// ------------------------------------
[
  ['woff', 'application/font-woff'],
  ['woff2', 'application/font-woff2'],
  ['otf', 'font/opentype'],
  ['ttf', 'application/octet-stream'],
  ['eot', 'application/vnd.ms-fontobject'],
  ['svg', 'image/svg+xml'],
].forEach((font) => {
  const extension = font[0];
  const mimetype = font[1];

  config.module.rules.push({
    test: new RegExp(`\\.${extension}$`),
    loader: 'url-loader',
    options: {
      name: 'fonts/[name].[ext]',
      limit: 10000,
      mimetype,
    },
  });
});

// HTML Template
// ------------------------------------
config.plugins.push(new HtmlWebpackPlugin({
  template: inProjectSrc('index.html'),
  inject: true,
  minify: {
    collapseWhitespace: true,
  },
}));

// Development Tools
// ------------------------------------
if (DEV) {
  config.plugins.push(
    // enable HMR globally
    new webpack.HotModuleReplacementPlugin(),

    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),

    // do not emit compiled assets that include errors
    new webpack.NoEmitOnErrorsPlugin(),
  );
}

// Bundle Splitting
// ------------------------------------
if (!TEST) {
  const bundles = [/* 'normalize', */'manifest'];

  if (project.vendors && project.vendors.length) {
    bundles.unshift('vendor');
    config.entry.vendor = project.vendors;
  }
  config.plugins.push(new webpack.optimize.CommonsChunkPlugin({ names: bundles }));
}

// Production Optimizations
// ------------------------------------
if (PROD) {
  config.plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: !!config.devtool,
      comments: false,
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
    }),
  );
} else {
  config.plugins.push(new DashboardPlugin());
}

module.exports = config;
