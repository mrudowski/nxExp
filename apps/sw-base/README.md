# About swBase

This is my learning project.
A place where I'm experimenting with all new and old things in new way

# On my list
- ✅ use fine https://swapi.info/ (in the place of a little slow https://swapi.dev/)
- ✅ add vitest and tests
- ✅ add https://mswjs.io/ - Industry standard API mocking for JavaScript
- add more test
- make vitest-preview works
- ✅ absolute imports
- ✅ try clsx instead of classnames
- ✅ add light/dark mode without flickering
- (?) fix common vite.config for SCSS absolute import
- ✅ useSuspenseQuery
- ✅ use QueryErrorResetBoundary
- ✅ try Jotai - Primitive and flexible state management for React
- ✅ try Zustand - Bear necessities for state management in React
- add cancellation https://github.com/sindresorhus/ky#cancellation
- try zod with react query https://tkdodo.eu/blog/type-safe-react-query#zod
- use react router outlet context https://reactrouter.com/en/main/hooks/use-outlet-context
- custom errors status
- ✅ turn off noImplicitAny
- ✅ new flat eslint config in ESLint v9.0.0 (Done, but the world is not ready yet for that)
- ✅ make plugin:testing-library/recommended works
- find lint to force sort properties alphabetically in i18n resources
  - ⚠️ almost https://github.com/ota-meshi/eslint-plugin-jsonc
  - https://github.com/godaddy/eslint-plugin-i18n-json

# Environment requirements

- node 18.17.1
  - best with windows version switcher: https://github.com/coreybutler/nvm-windows
  - mac/linux: https://github.com/nvm-sh/nvm
  ```
  nvm install 18.17.1
  nvm use 18.17.1
  ```
- yarn 1.22.19 or some later classic version (https://classic.yarnpkg.com/en/docs/install)
  ```
  npm install --global yarn
  ```

# Checks for known security issues with the installed packages

```
yarn audit
yarn audit --groups dependencies // only in dependencies group
```
