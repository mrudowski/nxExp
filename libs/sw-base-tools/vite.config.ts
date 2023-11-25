import path from 'path';
import {defineConfig} from 'vite';

import {defineConfigMethod} from '../../vite.config.base.ts';

const appPath = path.resolve(__dirname);
export default defineConfig(defineConfigMethod(appPath));
