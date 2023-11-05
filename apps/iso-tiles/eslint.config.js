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
    files: ['apps/iso-tiles/**/*.ts', 'apps/iso-tiles/**/*.tsx', 'apps/iso-tiles/**/*.js', 'apps/iso-tiles/**/*.jsx'],
    rules: {},
  },
  {
    files: ['apps/iso-tiles/**/*.ts', 'apps/iso-tiles/**/*.tsx'],
    rules: {},
  },
  {
    files: ['apps/iso-tiles/**/*.js', 'apps/iso-tiles/**/*.jsx'],
    rules: {},
  },
  ...compat.extends('plugin:@nx/react'),
];
