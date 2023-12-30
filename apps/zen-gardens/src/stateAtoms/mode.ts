// selectedPaletteTilesAtom
// -----------------------------

import {atomWithStorage} from 'jotai/utils';

import {LS_KEY_PREFIX} from '../../constants.ts';

const MODE_LS_KEY = `${LS_KEY_PREFIX}-mode`;

type ModeAtom = 'paint' | 'erase' | 'select';

export const modeAtom = atomWithStorage<ModeAtom>(MODE_LS_KEY, 'paint');
