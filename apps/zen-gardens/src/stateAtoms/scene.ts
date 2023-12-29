// selectedPaletteTilesAtom
// -----------------------------

import {atomWithStorage} from 'jotai/utils';

import {LS_KEY_PREFIX} from '../../constants.ts';

const SCENE_LS_KEY = `${LS_KEY_PREFIX}-scene`;

interface Tile {
  tileSet: string;
  id: string;
}
interface Level {
  id: number;
  // position: if order in array would be a problem
  tiles: Tile[];
}
interface SceneAtom {
  size: number;
  levels: Level[];
}

const sceneAtomInitialValue: SceneAtom = {
  size: 5,
  levels: [
    {
      id: 0,
      tiles: [],
    },
  ],
};

export const sceneAtom = atomWithStorage<SceneAtom>(SCENE_LS_KEY, sceneAtomInitialValue);
