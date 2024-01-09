// selectedPaletteTilesAtom
// -----------------------------

import {atom} from 'jotai';
import {atomWithStorage} from 'jotai/utils';

import {modeAtom} from '@/stateAtoms/modeAtoms.ts';
import {selectedPaletteTilesAtom} from '@/stateAtoms/paletteAtoms.ts';
import {addActionToUndoRedoAtom} from '@/stateAtoms/undoRedoAtoms.ts';

import {LS_KEY_PREFIX} from '../../constants.ts';

const SCENE_LS_KEY = `${LS_KEY_PREFIX}-scene`;

interface Slot {
  tileId: string | null;
}
interface Level {
  id: number;
  // position: if order in array would be a problem
  slots: Record<string, Slot>;
}
export interface Scene {
  size: number;
  levels: Level[];
}

const sceneAtomInitialValue: Scene = {
  size: 5,
  levels: [
    {
      id: 0,
      slots: {},
    },
  ],
};

export const sceneAtom = atomWithStorage<Scene>(SCENE_LS_KEY, sceneAtomInitialValue);
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
  const mode = get(modeAtom);
  if (mode === 'select') {
    return;
  }

  const selectedPaletteTiles = get(selectedPaletteTilesAtom);
  let updatedSlot: Slot;

  if (mode === 'paint') {
    updatedSlot = {
      tileId: selectedPaletteTiles[0],
    };
  }
  if (mode === 'erase') {
    updatedSlot = {
      tileId: null,
    };
  }

  let prevSlotTileId: string | null = null;

  set(sceneAtom, prevState => ({
    ...prevState,
    levels: prevState.levels.map(lvl => {
      if (lvl.id === update.levelId) {
        prevSlotTileId = lvl.slots[update.slotId]?.tileId || null;
        return {
          ...lvl,
          slots: {
            ...lvl.slots,
            [update.slotId]: updatedSlot,
          },
        };
      }
      return lvl;
    }),
  }));

  // TODO when action end - special attribute - in progress
  set(addActionToUndoRedoAtom, {
    mode,
    selectedPaletteTiles,
    level: update.levelId,
    slots: [{tileId: prevSlotTileId, slotId: update.slotId}],
  });
});

// not very helpful because of React key rule
// export const sceneLevelAtomsAtom = splitAtom(sceneLevelsAtom);

// ------

const SCENE_SIZE_LS_KEY = `${LS_KEY_PREFIX}-scene-size`;

export const sceneSizeAtom = atomWithStorage(SCENE_SIZE_LS_KEY, 5);

// ------

const SCENE_SCALE_LS_KEY = `${LS_KEY_PREFIX}-scene-scale`;

export const sceneScaleAtom = atomWithStorage(SCENE_SCALE_LS_KEY, 2);

// ------
