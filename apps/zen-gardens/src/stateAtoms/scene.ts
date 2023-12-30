// selectedPaletteTilesAtom
// -----------------------------

import {atom} from 'jotai';
import {atomWithStorage} from 'jotai/utils';

import {selectedPaletteTilesAtom} from '@/stateAtoms/palette.ts';

import {LS_KEY_PREFIX} from '../../constants.ts';

const SCENE_LS_KEY = `${LS_KEY_PREFIX}-scene`;

interface Slot {
  tileSetId: number;
  tileName: string;
}
interface Level {
  id: number;
  // position: if order in array would be a problem
  slots: Record<string, Slot>;
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
      slots: {},
    },
  ],
};

export const sceneAtom = atomWithStorage<SceneAtom>(SCENE_LS_KEY, sceneAtomInitialValue);
export const sceneLevelsAtom = atom(get => {
  return get(sceneAtom).levels;
});

// export const sceneLevelTileAtom = atom(get => {
//   return get(sceneLevelsAtom)[0];
// });

interface Update {
  levelId: number;
  slotId: string;
}
export const sceneLevelTileAtom = atom(null, (get, set, update: Update) => {
  // if paint mode!
  // const scene = get(sceneAtom);
  const selectedPaletteTiles = get(selectedPaletteTilesAtom);
  set(sceneAtom, prevState => ({
    ...prevState,
    levels: prevState.levels.map(lvl => {
      if (lvl.id === update.levelId) {
        return {
          ...lvl,
          slots: {
            ...lvl.slots,
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

// ------

const SCENE_SIZE_LS_KEY = `${LS_KEY_PREFIX}-scene-size`;

export const sceneSizeAtom = atomWithStorage(SCENE_SIZE_LS_KEY, 5);
