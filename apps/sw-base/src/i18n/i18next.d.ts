/**
 * https://www.i18next.com/overview/typescript
 * react-i18next has embedded type definitions.
 * If your project is relying on TypeScript 4.1+, and you want to
 * enhance IDE Experience and prevent errors (such as type coercion),
 * you should follow the instructions below in order to get the `t` function
 * fully-type safe (`keys` and `return` type).
 */

import {defaultNS, resources} from './i18n.ts';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: (typeof resources)['en'];
  }
}
