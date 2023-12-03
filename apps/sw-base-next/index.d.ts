/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.svg' {
  const content: any;
  export const ReactComponent: any;
  export default content;
}

// Use type safe message keys with `next-intl`
type Messages = typeof import('@/messages/en.json');
type IntlMessages = Messages;
