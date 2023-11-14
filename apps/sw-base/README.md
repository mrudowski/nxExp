# About

`swBase` is learning project. It uses fine https://swapi.info/ (in the place of a little slow https://swapi.dev/)

# TODO in my spare time:
- ✅ ~~add vitest and tests~~
- add more test
- make vitest-preview works
- ✅ ~~absolute imports~~
- ✅ ~~try clsx~~
- ✅ ~~add light/dark mode without flickering~~
- (?) fix common vite.config for SCSS absolute import
- make plugin:testing-library/recommended works
- ✅ ~~useSuspenseQuery~~
- use QueryErrorResetBoundary
- add cancellation https://github.com/sindresorhus/ky#cancellation
- try zod https://tkdodo.eu/blog/type-safe-react-query#zod
- use react router outlet context https://reactrouter.com/en/main/hooks/use-outlet-context
- custom errors status
- find lint to force sort properties alphabetically in i18n resources
- test swBase in ✅ react (by nx/vite/swc) vs nextjs / remix / astro / gatsby solution
- ✅ ~~turn off noImplicitAny~~
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
