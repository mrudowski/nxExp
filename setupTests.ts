// jest-dom adds custom jest matchers for asserting on DOM nodes
// https://github.com/testing-library/jest-dom#with-vitest
import '@testing-library/jest-dom/vitest';

// old way
// import '@testing-library/jest-dom/extend-expect';

// @ts-ignore
// import matchers from '@testing-library/jest-dom/matchers';
// extends Vitest's expect method with methods from react-testing-library
// @ts-ignore
// expect.extend(matchers);

// runs a cleanup after each test case (e.g. clearing jsdom)
// afterEach(() => {
//   cleanup();
// });

// Vitest doesn't intercept require calls. It's a known limitations:
// - https://github.com/vitest-dev/vitest/issues/2189
// - https://github.com/vitest-dev/vitest/issues/2296
// Note: have to be fired before any other package which require css
// require.extensions['.css'] = () => ({});
// require.extensions['.scss'] = () => ({});
