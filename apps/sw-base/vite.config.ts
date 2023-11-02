/// <reference types='vitest' />
// import {checker} from 'vite-plugin-checker';
import {checker} from '@hyoban/vite-plugin-checker';
import {nxViteTsPaths} from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import react from '@vitejs/plugin-react-swc';
import {defineConfig, loadEnv} from 'vite';

// add eslint when dev!

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    cacheDir: '../../node_modules/.vite/sw-base',

    server: {
      port: 4200,
      host: 'localhost',
    },

    preview: {
      port: 4300,
      host: 'localhost',
    },

    plugins: [
      react(),
      nxViteTsPaths(),
      !env.VITEST
        ? checker({
            // typescript: true,
            // https://github.com/fi3ework/vite-plugin-checker/issues/218
            // https://github.com/nrwl/nx/issues/13954#issuecomment-1370111065
            typescript: {
              root: `${process.cwd()}/apps/sw-base`,
              tsconfigPath: 'tsconfig.app.json',
            },
            // https://github.com/fi3ework/vite-plugin-checker/issues/244
            // https://github.com/fi3ework/vite-plugin-checker/pull/282
            eslint: {
              useFlatConfig: true,
              lintCommand: 'eslint "./src/**/*.{ts,tsx}"', // only here
            },
          })
        : undefined,
    ],

    // Uncomment this if you are using workers.
    // worker: {
    //  plugins: [ nxViteTsPaths() ],
    // },

    // @ts-ignore
    test: {
      globals: true,
      cache: {
        dir: '../../node_modules/.vitest',
      },
      environment: 'jsdom',
      include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    },
  };
});
