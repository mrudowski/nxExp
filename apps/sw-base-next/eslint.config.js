const {FlatCompat} = require('@eslint/eslintrc');
const js = require('@eslint/js');
const baseConfig = require('../../eslint.config.js');
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

const nextConfig = [
  {
    files: ['apps/sw-base-next/**/*.*'],
    rules: {'@next/next/no-html-link-for-pages': 'off'},
  },
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
];

module.exports = [
  ...baseConfig,
  ...nextConfig,
  // 🚫 not working when `nx lint sw-base-next`
  // as solution I change `lintFilePatterns` in `project.json`
  {
    ignores: ['apps/sw-base-next/.next/**/*', '**/apps/sw-base-next/.next/**/*', '**/.next/**/*', '**/.next/*'],
  },
];
