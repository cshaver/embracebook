const path = require('path');

// load the default config generator.
const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');
const webpackConfig = require('../webpack/config/webpack.config');

module.exports = (baseConfig, env) => {
  const config = genDefaultConfig(baseConfig, env);

  return {
    ...config,
    resolve: webpackConfig.resolve,
    module: {
      ...config.module,
      rules: [
        ...config.module.rules,
        {
          test: /\.s?css$/,
          use: ['style-loader', 'raw-loader', 'sass-loader'],
          include: [
            path.resolve(__dirname, '../src/styles/'),
          ],
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: 'babel-loader',
              query: {
                presets: ['airbnb'],
              },
            },
          ],
        },
        {
          test: /\.jsx$/,
          use: [
            {
              loader: 'babel-loader',
              query: {
                presets: ['airbnb'],
              },
            },
          ],
        },
      ],
    },
  };
};