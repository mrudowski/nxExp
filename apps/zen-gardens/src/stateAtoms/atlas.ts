import {atom} from 'jotai';

import {atlas} from '@/data/atlas.ts';

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
