import {atomWithStorage} from 'jotai/utils';

import {LS_KEY_PREFIX} from '../../constants.ts';

const SELECTED_PALETTE_TILES_LS_KEY = `${LS_KEY_PREFIX}-selected-palette-tiles`;
const selectedPaletteTilesInitialValue: string[] = [];
export const selectedPaletteTilesAtom = atomWithStorage(
  SELECTED_PALETTE_TILES_LS_KEY,
  selectedPaletteTilesInitialValue
);
