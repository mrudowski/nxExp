const {FlatCompat} = require('@eslint/eslintrc');
const js = require('@eslint/js');
const globals = require('globals');
const tsParser = require('@typescript-eslint/parser');
// const jsoncParser = require('jsonc-eslint-parser');

// const reactRecommended = require('eslint-plugin-react/configs/recommended');
// const reactJsxRuntimeRecommended = require('eslint-plugin-react/configs/jsx-runtime');
// const reactHooksPlugin = require('eslint-plugin-react-hooks');
// const testingLibraryPlugin = require('eslint-plugin-testing-library');
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
  // https://eslint.org/docs/latest/use/configure/configuration-files-new#using-predefined-configurations
  js.configs.recommended,
  //  Warning: The 'eslint:recommended' string configuration is deprecated and will be replaced
  //  by the @eslint/js package's 'recommended' config.
  // 'eslint:recommended',

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

  /**
   *❓responsible for?
   */
  ...compat.config({extends: ['plugin:@nx/javascript']}).map(config => ({
    ...config,
    files: ['**/*.js', '**/*.jsx'],
  })),

  /**
   * ✅❓working...
   * - needed for rules inside plugin:@nx/react
   * ❓plugin:import/typescript works?
   */
  ...compat
    .config({extends: ['plugin:@typescript-eslint/recommended', 'plugin:import/typescript', 'plugin:@nx/typescript']})
    .map(config => ({
      ...config,
      files: ['**/*.ts', '**/*.tsx'],
    })),

  /**
   * ✅ works great
   */
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    plugins: {
      'simple-import-sort': simpleImportSortPlugin,
    },
    rules: {
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
    },
  },

  /**
   * ✅ works great
   */
  ...compat
    .config({
      extends: ['plugin:testing-library/react', 'plugin:jest-dom/recommended'],
    })
    .map(config => ({
      ...config,
      // files: ['**/*.(spec|test).(ts|tsx|js|jsx)'],
    })),

  /**
   * ♥️my favorites
   * outside recommended set https://eslint.org/docs/latest/rules/
   */
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      'consistent-return': 'warn',
      'func-names': 'warn',
      'object-shorthand': 'warn',
      'prefer-const': 'warn',
      'no-param-reassign': 'warn',
      'prefer-arrow-callback': ['warn', {allowNamedFunctions: true}],
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-shadow': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          ignoreRestSiblings: true,
        },
      ],
      // not needed for now: check if missing return type on function
      // '@typescript-eslint/explicit-module-boundary-types': ['error'],
    },
  },

  // -------------- start of i18n json exp

  // json from nx docs
  // 🚫 not working when nx lint sw-base
  {
    files: ['**/*.json'],
    ignores: ['project.json'], // working?
    plugins: {
      jsonc: jsoncPlugin,
    },
    // 🚫 stop working when active
    // languageOptions: {
    //   parser: jsoncParser,
    // },
    rules: {
      ...jsoncPlugin.configs['recommended-with-json'].rules,
      // ...jsoncPlugin.configs['recommended-with-jsonc'].rules,
      ...jsoncPlugin.configs.all.rules,
      'jsonc/auto': 'warn',
      //'jsonc/sort-array-values': 'warn',
      // 🚫 not working
      'jsonc/sort-keys': [
        'error',
        'asc',
        {
          caseSensitive: true,
          natural: false,
          minKeys: 2,
          allowLineSeparatedGroups: false,
        },
      ],
    },
  },

  // TODO
  // ...compat.extends('plugin:i18n-json/recommended'),

  // not working
  // ...compat.plugins('eslint-plugin-jsonc'),
  // ...compat.plugins('eslint-plugin-i18n-json'),
  //
  // ...compat.extends('plugin:jsonc/recommended-with-jsonc', 'plugin:jsonc/all'),

  // ...compat.extends('plugin:jsonc/recommended-with-jsonc', 'plugin:jsonc/all'),
  // ...compat
  //   .config({
  //     plugins: ['eslint-plugin-jsonc'],
  //     extends: ['plugin:jsonc/recommended-with-jsonc', 'plugin:jsonc/all'],
  //     // rules: {
  //     //   'json/*': ['error', {allowComments: true}],
  //     // },
  //   })
  //   .map(config => ({
  //     ...config,
  //     // parser: 'jsonc-eslint-parser',
  //     files: ['**/*.json'], // This plugin will parse .json, .jsonc and .json5 using the configuration provided by the plugin.
  //     // rules: {
  //     //   // 'json/*': ['error', {allowComments: true}],
  //     // },
  //   })),

  // // TODO
  // ...compat
  //   .config({
  //     extends: [
  //       // 'plugin:json/recommended',
  //       //'i18n-json/sorted-keys',
  //       //'i18n-json/recommended',
  //       'plugin:jsonc/base',
  //       'plugin:jsonc/recommended-with-json',
  //       'plugin:jsonc/recommended-with-jsonc',
  //       'plugin:jsonc/all',
  //     ],
  //   })
  //   .map(config => ({
  //     ...config,
  //     files: ['*/*.json'], // This plugin will parse .json, .jsonc and .json5 using the configuration provided by the plugin.
  //     // rules: {
  //     //   // 'json/*': ['error', {allowComments: true}],
  //     // },
  //   })),

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

  // -------------- end of i18n json exp
  {
    ignores: ['**/.next/**/*'],
  },
];
