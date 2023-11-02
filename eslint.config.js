const {FlatCompat} = require('@eslint/eslintrc');
const nxEslintPlugin = require('@nx/eslint-plugin');
const eslintPluginReactRefresh = require('eslint-plugin-react-refresh');
const eslintPluginSimpleImportSort = require('eslint-plugin-simple-import-sort');
const js = require('@eslint/js');
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});
module.exports = [
  {
    plugins: {
      '@nx': nxEslintPlugin,
      'react-refresh': eslintPluginReactRefresh,
      'simple-import-sort': eslintPluginSimpleImportSort,
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
    },
  },
  ...compat
    .config({
      extends: [
        'eslint:recommended',
        'plugin:react-hooks/recommended',
        'plugin:import/recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
      ],
    })
    .map(config => ({
      ...config,
      files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
      rules: {
        'react-refresh/only-export-components': ['warn', {allowConstantExport: true}],
        'simple-import-sort/imports': 'warn',
        'simple-import-sort/exports': 'warn',
        // turn on but so good/new that it's nice to know about it:
        // 'react/jsx-no-useless-fragment': 'warn',
      },
    })),
  ...compat
    .config({extends: ['plugin:@typescript-eslint/recommended', 'plugin:import/typescript', 'plugin:@nx/typescript']})
    .map(config => ({
      ...config,
      files: ['**/*.ts', '**/*.tsx'],
      rules: {},
    })),
  ...compat.config({extends: ['plugin:@nx/javascript']}).map(config => ({
    ...config,
    files: ['**/*.js', '**/*.jsx'],
    rules: {},
  })),
];
