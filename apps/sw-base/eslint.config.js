const baseConfig = require('../../eslint.config.js');
module.exports = [
  ...baseConfig,
  {
    files: ['apps/sw-base/**/*.ts', 'apps/sw-base/**/*.tsx', 'apps/sw-base/**/*.js', 'apps/sw-base/**/*.jsx'],
    rules: {},
  },
  {
    files: ['apps/sw-base/**/*.ts', 'apps/sw-base/**/*.tsx'],
    rules: {},
  },
  {
    files: ['apps/sw-base/**/*.js', 'apps/sw-base/**/*.jsx'],
    rules: {},
  },
  ...compat.extends('plugin:@nx/react'),
];
