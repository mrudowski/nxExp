/// <reference types='vitest' />
import path from 'path';
import {defineConfig} from 'vite';

import {defineConfigMethod} from '../../vite.config.base.ts';

const appSrc = path.resolve(__dirname);
export default defineConfig(defineConfigMethod(appSrc));
