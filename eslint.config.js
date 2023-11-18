const {FlatCompat} = require('@eslint/eslintrc');
const js = require('@eslint/js');
const globals = require('globals');
const tsParser = require('@typescript-eslint/parser');
const jsoncParser = require('jsonc-eslint-parser');

// const reactRecommended = require('eslint-plugin-react/configs/recommended');
// const reactJsxRuntimeRecommended = require('eslint-plugin-react/configs/jsx-runtime');
// const reactHooksPlugin = require('eslint-plugin-react-hooks');
const testingLibraryPlugin = require('eslint-plugin-testing-library');
//const i18nJsonPlugin = require('eslint-plugin-i18n-json');
const jsoncPlugin = require('eslint-plugin-jsonc');
//const json = require('eslint-plugin-json');
const nxPlugin = require('@nx/eslint-plugin');
const reactRefreshPlugin = require('eslint-plugin-react-refresh');
const simpleImportSortPlugin = require('eslint-plugin-simple-import-sort');

/**
 * flat config
 * docs:
 * https://nx.dev/recipes/tips-n-tricks/flat-config#switching-to-eslints-flat-config-format
 * https://eslint.org/docs/latest/use/configure/configuration-files-new
 */

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  // TODO?
  js.configs.recommended,
  // TODO
  //...compat.plugins('eslint:recommended'),
  //...compat.plugins('eslint:recommended'),
  'eslint:recommended', // working or the same as js.configs.recommended?

  {
    plugins: {
      '@nx': nxPlugin,
    },
  },

  {
    settings: {
      react: {
        version: 'detect',
      },
    },
    // nx docs
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.node,
      },
    },
    rules: {
      // not needed for now: check if missing return type on function
      // '@typescript-eslint/explicit-module-boundary-types': ['error'],
    },
  },

  // json from nx docs
  {
    files: ['*.json'],
    plugins: {
      // 🚫not working
      'plugin:jsonc': jsoncPlugin,
    },
    languageOptions: {
      parser: jsoncParser,
    },
    rules: {
      // 🚫not working
      ...jsoncPlugin.configs['recommended-with-json'].rules,
    },
  },

  // nx docs
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

  // TODO not working
  {
    files: ['**/*.(spec|test).(ts|tsx|js|jsx)'],
    plugins: {
      'testing-library': testingLibraryPlugin,
      // TODO
      //'plugin:testing-library/react',
      // 'plugin:testing-library/recommended', // not working
      // 'plugin:jest-dom/recommended',
    },
    rules: {
      //...testingLibraryPlugin.configs.recommended.rules,
      'testing-library/await-async-queries': 'error',
      'testing-library/no-await-sync-queries': 'error',
      'testing-library/no-debugging-utils': 'warn',
      'testing-library/no-dom-import': 'off',
    },
  },

  /**
   * ✅ works great
   */
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    plugins: {
      'react-refresh': reactRefreshPlugin,
      'simple-import-sort': simpleImportSortPlugin,
    },
    rules: {
      'react-refresh/only-export-components': ['warn', {allowConstantExport: true}],
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
    },
  },

  // TODO
  // https://github.com/azeemba/eslint-plugin-json/issues/80
  // {
  //   files: ['**/*.json'],
  //   // ...i18nJsonPlugin.configs.recommended,
  //   plugins: {
  //     'i18n-json': i18nJsonPlugin,
  //   },
  //   processor: i18nJsonPlugin.processors['.json'],
  //   rules: i18nJsonPlugin.configs.recommended.rules,
  // },

  // TODO working???
  ...compat
    .config({
      extends: ['plugin:import/recommended'],
    })
    .map(config => ({
      ...config,
      files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
      rules: {
        // turn on but so good/new that it's nice to know about it:
        // 'react/jsx-no-useless-fragment': 'warn',
      },
    })),

  // ✅ working TODO but without import... and double itselfs?
  /**
   * ❓needed for rules inside plugin:@nx/react
   */

  ...compat
    .config({extends: ['plugin:@typescript-eslint/recommended', 'plugin:import/typescript', 'plugin:@nx/typescript']})
    .map(config => ({
      ...config,
      files: ['**/*.ts', '**/*.tsx'],
      rules: {},
    })),

  /**
   *❓responsible for?
   */
  ...compat.config({extends: ['plugin:@nx/javascript']}).map(config => ({
    ...config,
    files: ['**/*.js', '**/*.jsx'],
    rules: {},
  })),

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

  // TODO
  ...compat.extends('plugin:i18n-json/recommended'),

  ...compat.extends('plugin:jsonc/recommended-with-jsonc', 'plugin:jsonc/all'),
  ...compat
    .config({
      extends: ['plugin:jsonc/recommended-with-jsonc', 'plugin:jsonc/all'],
    })
    .map(config => ({
      ...config,
      // parser: 'jsonc-eslint-parser',
      files: ['**/*.json'], // This plugin will parse .json, .jsonc and .json5 using the configuration provided by the plugin.
      rules: {
        // 'json/*': ['error', {allowComments: true}],
      },
    })),

  // TODO
  ...compat
    .config({
      extends: [
        // 'plugin:json/recommended',
        //'i18n-json/sorted-keys',
        //'i18n-json/recommended',
        // 'plugin:jsonc/base',
        // 'plugin:jsonc/recommended-with-json',
        // 'plugin:jsonc/all',
      ],
    })
    .map(config => ({
      ...config,
      files: ['**/*.json'], // This plugin will parse .json, .jsonc and .json5 using the configuration provided by the plugin.
      rules: {
        // 'json/*': ['error', {allowComments: true}],
      },
    })),

  // ♥️my favorites
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      'no-param-reassign': 'warn',
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-shadow': 'warn',
    },
  },
];

// TODO add eslint from asweb
