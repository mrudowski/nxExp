const {FlatCompat} = require('@eslint/eslintrc');
const baseConfig = require('../../eslint.config.js');
const js = require('@eslint/js');
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});
module.exports = [
  ...baseConfig,
  {
    files: ['apps/css-fun/**/*.ts', 'apps/css-fun/**/*.tsx', 'apps/css-fun/**/*.js', 'apps/css-fun/**/*.jsx'],
    rules: {},
  },
  {
    files: ['apps/css-fun/**/*.ts', 'apps/css-fun/**/*.tsx'],
    rules: {},
  },
  {
    files: ['apps/css-fun/**/*.js', 'apps/css-fun/**/*.jsx'],
    rules: {},
  },
  ...compat.extends('plugin:@nx/react'),
];
