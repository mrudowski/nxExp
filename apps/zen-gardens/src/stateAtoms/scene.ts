// selectedPaletteTilesAtom
// -----------------------------

import {atom} from 'jotai';
import {atomWithStorage} from 'jotai/utils';

import {selectedPaletteTilesAtom} from '@/stateAtoms/palette.ts';

import {LS_KEY_PREFIX} from '../../constants.ts';

const SCENE_LS_KEY = `${LS_KEY_PREFIX}-scene`;

interface Tile {
  tileSetId: number;
  tileName: string;
}
interface Level {
  id: number;
  // position: if order in array would be a problem
  tiles: Record<string, Tile>;
}
export interface SceneAtom {
  size: number;
  levels: Level[];
}

const sceneAtomInitialValue: SceneAtom = {
  size: 5,
  levels: [
    {
      id: 0,
      tiles: {},
    },
  ],
};

export const sceneAtom = atomWithStorage<SceneAtom>(SCENE_LS_KEY, sceneAtomInitialValue);
export const sceneSizeAtom = atom(get => {
  console.log('%c [mr] sceneSizeAtom', 'background-color:Gold; color: black', get(sceneAtom).size);
  return get(sceneAtom).size;
});

export const sceneLevelsAtom = atom(get => {
  return get(sceneAtom).levels;
});

// export const sceneLevelTileAtom = atom(get => {
//   return get(sceneLevelsAtom)[0];
// });

interface Update {
  levelId: number;
  slotId: string; // TODO REFACTOR - change tile to TileSlot!
  tileName: string;
  tileSetId: number;
}
export const sceneLevelTileAtom = atom(null, (get, set, update: Update) => {
  // const scene = get(sceneAtom);
  const selectedPaletteTiles = get(selectedPaletteTilesAtom);
  set(sceneAtom, prevState => ({
    ...prevState,
    levels: prevState.levels.map(lvl => {
      if (lvl.id === update.levelId) {
        return {
          ...lvl,
          tiles: {
            ...lvl.tiles,
            [update.slotId]: {
              tileSetId: selectedPaletteTiles[0].tileSetId,
              tileName: selectedPaletteTiles[0].tileName,
            },
          },
        };
      }
      return lvl;
    }),
  }));
});

// not very helpful because of React key rule
// export const sceneLevelAtomsAtom = splitAtom(sceneLevelsAtom);
