module.exports = {
  env: { browser: true, es2020: true },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
  extends: [
    // 'plugin:@typescript-eslint/recommended-type-checked', // recommended
    // 'plugin:@typescript-eslint/stylistic-type-checked', // Optionally
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  rules: {
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
