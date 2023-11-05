/// <reference types='vitest' />
import {defineConfig} from 'vite';

import {defineConfigMethod} from '../../vite.config.base.ts';
import path from 'path';

const appSrc = path.resolve(__dirname, 'src');
export default defineConfig(defineConfigMethod(appSrc));
