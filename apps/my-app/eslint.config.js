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
    files: ['apps/my-app/**/*.ts', 'apps/my-app/**/*.tsx', 'apps/my-app/**/*.js', 'apps/my-app/**/*.jsx'],
    rules: {},
  },
  {
    files: ['apps/my-app/**/*.ts', 'apps/my-app/**/*.tsx'],
    rules: {},
  },
  {
    files: ['apps/my-app/**/*.js', 'apps/my-app/**/*.jsx'],
    rules: {},
  },
];
