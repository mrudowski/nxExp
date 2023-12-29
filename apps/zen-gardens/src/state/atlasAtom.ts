import {atom} from 'jotai';
import {atomWithStorage} from 'jotai/utils';

import {atlas} from '@/data/atlas.ts';

import {LS_KEY_PREFIX} from '../../constants.ts';

// activeTileSet
// -----------------------------

export const activeTileSetIndexAtom = atom(0);
export const tileSetAtom = atom(get => {
  console.log('%c [mr] tileSetAtom', 'background-color:Gold; color: black');
  return atlas[get(activeTileSetIndexAtom)];
});
export const tileWidthSceneScaledAtom = atom(get => {
  const tileSet = get(tileSetAtom);
  console.log('%c [mr] tileWidthSceneScaledAtom', 'background-color:Gold; color: black');
  return tileSet.tileWidth * tileSet.sceneScale;
});
export const tileHeightSceneScaledAtom = atom(get => {
  const tileSet = get(tileSetAtom);
  return tileSet.tileHeight * tileSet.sceneScale;
});
export const tileWidthPaletteScaledAtom = atom(get => {
  const tileSet = get(tileSetAtom);
  console.log('%c [mr] tileWidthPaletteScaledAtom', 'background-color:Gold; color: black');
  return tileSet.tileWidth * tileSet.paletteScale;
});
export const tileHeightPaletteScaledAtom = atom(get => {
  const tileSet = get(tileSetAtom);
  return tileSet.tileHeight * tileSet.paletteScale;
});

// selectedTiles
// -----------------------------

const SELECTED_PALETTE_TILES_LS_KEY = `${LS_KEY_PREFIX}-selected-palette-tiles`;

const emptyArray: string[] = [];
export const selectedPaletteTilesAtom = atomWithStorage(SELECTED_PALETTE_TILES_LS_KEY, emptyArray);
