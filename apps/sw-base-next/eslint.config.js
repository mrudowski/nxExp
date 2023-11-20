const {FlatCompat} = require('@eslint/eslintrc');
const js = require('@eslint/js');
const baseConfig = require('../../eslint.config.js');
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  {
    files: ['apps/sw-base-next/**/*.*'],
    rules: {'@next/next/no-html-link-for-pages': 'off'},
  },
  ...baseConfig,
  {
    files: [
      'apps/sw-base-next/**/*.ts',
      'apps/sw-base-next/**/*.tsx',
      'apps/sw-base-next/**/*.js',
      'apps/sw-base-next/**/*.jsx',
    ],
    rules: {
      '@next/next/no-html-link-for-pages': ['error', 'apps/sw-base-next/pages'],
    },
  },
  ...compat.extends('plugin:@nx/react-typescript', 'next', 'next/core-web-vitals'),
  ...compat.config({env: {jest: true}}).map(config => ({
    ...config,
    files: [
      'apps/sw-base-next/**/*.spec.ts',
      'apps/sw-base-next/**/*.spec.tsx',
      'apps/sw-base-next/**/*.spec.js',
      'apps/sw-base-next/**/*.spec.jsx',
    ],
  })),
  {ignores: ['apps/sw-base-next/.next/**/*']},
];
