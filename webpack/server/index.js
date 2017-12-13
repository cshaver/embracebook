/* eslint-disable import/no-extraneous-dependencies */

const express = require('express');
const path = require('path');
const compress = require('compression');
const webpack = require('webpack');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackDevMiddleware = require('webpack-dev-middleware');

const logger = require('../utils/logger');
const webpackConfig = require('../config/webpack.config');
const projectConfig = require('../config/project.config');

const app = express();
app.use(compress());

const compiler = webpack(webpackConfig);

logger.info('Enabling webpack development and HMR middleware');
app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  contentBase: path.resolve(projectConfig.basePath, projectConfig.srcDir),
  hot: true,
  quiet: false,
  noInfo: false,
  lazy: false,
  stats: 'normal',
}));
app.use(webpackHotMiddleware(compiler, {
  path: '/__webpack_hmr',
}));

// Serve static assets from public/ since Webpack is unaware of
// these files. This middleware doesn't need to be enabled outside
// of development since this directory will be copied into dist/
// when the application is compiled.
app.use(express.static(path.resolve(projectConfig.basePath, 'public')));

// This rewrites all routes requests to the root /index.html file
// (ignoring file requests). If you want to implement universal
// rendering, you'll want to remove this middleware.
app.use('*', (req, res, next) => {
  const filename = path.join(compiler.outputPath, 'index.html');
  compiler.outputFileSystem.readFile(filename, (err, result) => {
    if (err) {
      return next(err);
    }
    res.set('content-type', 'text/html');
    res.send(result);
    return res.end();
  });
});

module.exports = app;
