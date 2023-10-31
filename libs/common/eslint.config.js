const {FlatCompat} = require('@eslint/eslintrc');
const baseConfig = require('../../eslint.config.js');
const js = require('@eslint/js');
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});
module.exports = [
  ...baseConfig,
  ...compat.extends('plugin:@nx/react'),
  {
    files: ['libs/common/**/*.ts', 'libs/common/**/*.tsx', 'libs/common/**/*.js', 'libs/common/**/*.jsx'],
    rules: {},
  },
  {
    files: ['libs/common/**/*.ts', 'libs/common/**/*.tsx'],
    rules: {},
  },
  {
    files: ['libs/common/**/*.js', 'libs/common/**/*.jsx'],
    rules: {},
  },
];
