module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    // 'plugin:@typescript-eslint/recommended-type-checked', // recommended
    'plugin:react-hooks/recommended',
    // 'plugin:@typescript-eslint/stylistic-type-checked', // Optionally
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    // 'plugin:testing-library/recommended',
    // 'plugin:testing-library/react',
    // 'plugin:jest-dom/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'simple-import-sort'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'simple-import-sort/imports': 'warn',
    'simple-import-sort/exports': 'warn',
    'import/no-unresolved': 'off',
  },
  settings: {
    'react': {
      'version': 'detect'
    },
    'import/resolver': {
      'node': {
        'paths': ['@'],
        // 'paths': ['src/', '@/'],
        // paths: [path.resolve(__dirname)],
        // moduleDirectory: ['node_modules', 'src/', '@/', '@'],
        // 'extensions': ['.js', '.jsx', '.ts', '.tsx'],
      }
    }
  },
}
