// selectedPaletteTilesAtom
// -----------------------------

import {atomWithStorage} from 'jotai/utils';

import {LS_KEY_PREFIX} from '../../constants.ts';

const MODE_LS_KEY = `${LS_KEY_PREFIX}-mode`;

export type Mode = 'paint' | 'erase' | 'select';

export const modeAtom = atomWithStorage<Mode>(MODE_LS_KEY, 'paint');
