const {FlatCompat} = require('@eslint/eslintrc');
const js = require('@eslint/js');
const reactRefreshPlugin = require('eslint-plugin-react-refresh');
const simpleImportSortPlugin = require('eslint-plugin-simple-import-sort');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  /**
   * ✅ works great and replace reactRecommended, reactJsxRuntimeRecommended, reactHooksPlugin
   * it includes
   * - @nx/react-base
   * - @nx/react-jsx
   * - @nx/react-typescript
   */
  ...compat
    .config({
      extends: ['plugin:@nx/react'],
    })
    .map(config => ({
      ...config,
      files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    })),

  // not needed: @nx/react defined it and throw error when detected double
  // https://github.com/jsx-eslint/eslint-plugin-react#configuration-new-eslintconfigjs
  // {
  //   files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
  //   ...reactRecommended,
  // },
  // @nx/react defined it
  // {
  //   files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
  //   ...reactJsxRuntimeRecommended,
  // },
  // @nx/react defined it
  // {
  //   files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
  //   plugins: {
  //     'react-hooks': reactHooksPlugin,
  //   },
  //   rules: {
  //     ...reactHooksPlugin.configs.recommended.rules,
  //   },
  // },

  /**
   * ✅ working
   */
  ...compat
    .config({
      extends: ['plugin:import/recommended'],
    })
    .map(config => ({
      ...config,
      files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
      rules: {
        // ...config.rules,
        // we remove all recommended and write new ones:
        'import/no-useless-path-segments': 'warn',
        'import/no-cycle': 'warn',
        // removed because it doesn't allow to `import ky from 'ky';` or `import i18n from 'i18next';`
        // 'import/no-named-as-default-member': 'warn',
      },
    })),

  /**
   * ✅ works great
   */
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    plugins: {
      'react-refresh': reactRefreshPlugin,
    },
    rules: {
      'react-refresh/only-export-components': ['warn', {allowConstantExport: true}],
    },
  },

  /**
   * ♥️my favorites
   */
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      'react/jsx-no-useless-fragment': 'warn',
    },
  },
];
