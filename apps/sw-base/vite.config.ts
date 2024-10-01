/// <reference types='vitest' />
import * as path from 'path'
import {defineConfig} from 'vite';

// https://github.com/nrwl/nx/issues/21598#issuecomment-2210652927
// eslint-disable-next-line @nx/enforce-module-boundaries
import {defineConfigMethod} from '../../vite.config.base';

// const appSrc = path.resolve(__dirname, 'src');
const appPath = path.resolve(__dirname);
export default defineConfig(defineConfigMethod(appPath));
