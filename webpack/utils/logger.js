/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

const chalk = require('chalk');
const figures = require('figures');

// Need to support Node versions that don't support spreading function arguments
exports.log = console.log.bind(console);

exports.error = (...messages) => {
  console.error(chalk.red(...[figures.cross].concat(messages)));
};

exports.info = (...messages) => {
  console.info(chalk.cyan(...[figures.info].concat(messages)));
};

exports.success = (...messages) => {
  console.log(chalk.green(...[figures.tick].concat(messages)));
};

exports.warn = (...messages) => {
  console.warn(chalk.yellow(...[figures.warning].concat(messages)));
};
