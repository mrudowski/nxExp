import {atom} from 'jotai';
import {atomWithStorage} from 'jotai/utils';

import {atlas} from '@/data/atlas.ts';
import {getAtlas} from '@/data/getAtlas.ts';
import {sceneScaleAtom, sceneZoomAtom} from '@/stateAtoms/sceneAtoms.ts';

import {LS_KEY_PREFIX} from '../../constants.ts';

const SELECTED_PALETTE_TILES_LS_KEY = `${LS_KEY_PREFIX}-selected-palette-tiles`;

const selectedPaletteTilesInitialValue: {tileSetId: string; tileId: string}[] = [];
export const selectedPaletteTilesAtom = atomWithStorage(
  SELECTED_PALETTE_TILES_LS_KEY,
  selectedPaletteTilesInitialValue
);

// ----------

const ACTIVE_TILES_SET_LS_KEY = `${LS_KEY_PREFIX}-active-tile-set-id`;

export const activeTileSetIdAtom = atomWithStorage(ACTIVE_TILES_SET_LS_KEY, '0');

export const tileSetAtom = atom(get => {
  console.log('%c [mr] tileSetAtom', 'background-color:Gold; color: black');
  return getAtlas(atlas)[Number(get(activeTileSetIdAtom))];
});
export const writeActiveTileSetIdAtom = atom(null, (get, set, update: string) => {
  return set(activeTileSetIdAtom, update);
});

/**
 * It's works fast and is ref stable (but we check it every tile
 * with almost no penalty?
 */

export const tileWidthSceneScaledAtom = atom(get => {
  const tileSet = get(tileSetAtom);
  const sceneScale = get(sceneScaleAtom);
  const sceneZoom = get(sceneZoomAtom);
  console.log('%c [mr] tileWidthSceneScaledAtom', 'background-color:Gold; color: black');
  return tileSet.tileWidth * sceneScale * sceneZoom;
});
export const tileHeightSceneScaledAtom = atom(get => {
  const tileSet = get(tileSetAtom);
  const sceneScale = get(sceneScaleAtom);
  const sceneZoom = get(sceneZoomAtom);
  return tileSet.tileHeight * sceneScale * sceneZoom;
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
