// jest-dom adds custom jest matchers for asserting on DOM nodes
// https://github.com/testing-library/jest-dom#with-vitest
import '@testing-library/jest-dom/vitest';

import {http, HttpResponse} from 'msw';
import {setupServer} from 'msw/node';
import {vi} from 'vitest';

// https://testing-library.com/docs/react-testing-library/example-intro#step-by-step
// https://mswjs.io/docs/integrations/node#setup

const server = setupServer(
  // capture "GET /greeting" requests
  http.get('https://swapi.info/api/people', () => {
    // respond using a mocked JSON body
    return HttpResponse.json([
      {
        name: 'Luke Skywalker',
        url: 'https://swapi.info/api/people/1',
      },
      {
        name: 'C-3PO',
        url: 'https://swapi.info/api/people/2',
      },
    ]);
  })
);

// To confirm a successful setup, create a simple outgoing request listener on the server object:
server.events.on('request:start', ({request}) => {
  console.log('MSW intercepted:', request.method, request.url);
});

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

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

// https://github.com/vitest-dev/vitest/issues/821
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
