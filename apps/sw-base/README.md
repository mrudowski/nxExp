# About swBase

This is my learning project.
A place where I'm experimenting with all new and old things in new way

# On my list
- ✅ use fine https://swapi.info/ (in the place of a little slow https://swapi.dev/)
- ✅ add vitest and tests
- add more test
- make vitest-preview works
- ✅ absolute imports
- ✅ try clsx
- ✅ add light/dark mode without flickering
- (?) fix common vite.config for SCSS absolute import
- make plugin:testing-library/recommended works
- ✅ useSuspenseQuery
- ✅ use QueryErrorResetBoundary
- ✅ try Jotai - Primitive and flexible state management for React
- try Zustang - Bear necessities for state management in React
- add cancellation https://github.com/sindresorhus/ky#cancellation
- try zod with react query https://tkdodo.eu/blog/type-safe-react-query#zod
- use react router outlet context https://reactrouter.com/en/main/hooks/use-outlet-context
- custom errors status
- test swBase in 
  - ✅ react (by nx/vite/swc)
  - nextjs / remix / astro / gatsby solution
- ✅ turn off noImplicitAny
- ✅ new flat eslint config in ESLint v9.0.0 (Done, but it was too early for that)
- find lint to force sort properties alphabetically in i18n resources
- make eslint dev checker works as typescript - in all app dependencies

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
