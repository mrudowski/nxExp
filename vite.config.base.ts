/// <reference types='vitest' />
import {nxCopyAssetsPlugin} from '@nx/vite/plugins/nx-copy-assets.plugin';
import {nxViteTsPaths} from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import react from '@vitejs/plugin-react-swc';
//import * as path from 'path';
import {loadEnv, UserConfigFn} from 'vite';
import {checker} from 'vite-plugin-checker';
// import {checker} from '@hyoban/vite-plugin-checker';

// add eslint when dev!

// https://vitejs.dev/config/
export const defineConfigMethod =
  (appPath: string): UserConfigFn =>
  ({mode}) => {
    // Load env file based on `mode` in the current working directory.
    // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
    const env = loadEnv(mode, process.cwd(), '');
    const appName = appPath.split('/').at(-1);

    return {
      cacheDir: `../../node_modules/.vite/apps/${appName}`,

      server: {
        port: 4200,
        host: 'localhost',
        // have to for setupTests to work
        // https://github.com/nrwl/nx/issues/21259#issuecomment-2121841354
        fs: {
          allow: ["../../setupTests.ts"],
        }
      },

      preview: {
        port: 4300,
        host: 'localhost',
      },

      plugins: [
        react(),
        nxViteTsPaths(),
        nxCopyAssetsPlugin(['*.md']),
        !env.VITEST
          ? checker({
              // typescript: true,
              // https://github.com/fi3ework/vite-plugin-checker/issues/218
              // https://github.com/nrwl/nx/issues/13954#issuecomment-1370111065
              typescript: {
                // root: `${process.cwd()}/apps/sw-base`,
                root: appPath,
                tsconfigPath: 'tsconfig.app.json',
              },
              // https://github.com/fi3ework/vite-plugin-checker/issues/244
              // https://github.com/fi3ework/vite-plugin-checker/pull/282
              eslint: {
                useFlatConfig: true,
                // lintCommand: `eslint "${process.cwd()}/{apps,libs}/**/*.{ts,tsx}"`, // only here
                lintCommand: `eslint "${appPath}/../../apps/**/*.{ts,tsx}"`, // only here
                // lintCommand: `eslint "${appPath}/../../{apps,libs}/src/**/*.{ts,tsx}"`, // only here
                // lintCommand: `eslint "${appPath}/src/**/*.{ts,tsx}"`, // only here
              },
            })
          : undefined,
      ],

      // Uncomment this if you are using workers.
      // worker: {
      //  plugins: [ nxViteTsPaths() ],
      // },

      build: {
        outDir: `../../dist/apps/${appName}`,
        emptyOutDir: true,
        reportCompressedSize: true,
        commonjsOptions: {
          transformMixedEsModules: true,
        },
      },

      test: {
        watch: false,
        globals: true,
        environment: 'jsdom',
        include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],

        reporters: ['default'],
        coverage: {
          reportsDirectory: `../../coverage/apps/${appName}`,
          provider: 'v8',
        },

        // cacheDir: `../../node_modules/.vitest/${appName}`,
        // css: true, // for vitest-preview
        setupFiles: `../../setupTests.ts`,
      },

      // my for absolute imports
      // https://stackoverflow.com/questions/68241263/absolute-path-not-working-in-vite-project-react-ts
      resolve: {
        // alias: [{find: '@', replacement: path.resolve(__dirname, 'src')}],
        // alias: [{find: '@', replacement: './src'}],
        alias: [
          {find: '@', replacement: `${appPath}/src`},
          // for scss - to import from libs
          {find: '@libs', replacement: 'libs'},
        ],
      },
      // next,js - not needed?
      // sassOptions: {
      //   includePaths: [path.join(__dirname, 'libs')],
      // },
      css: {
        preprocessorOptions: {
          scss: {
            api: 'modern-compiler', // or 'modern'
            // not needed?
            // includePaths: [path.join(__dirname, 'libs')],
          },
        },
      },
    };
  };
