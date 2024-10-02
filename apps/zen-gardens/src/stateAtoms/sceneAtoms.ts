// selectedPaletteTilesAtom
// -----------------------------

import {atom} from 'jotai';
import {atomWithStorage} from 'jotai/utils';

import {modeAtom} from '@/stateAtoms/modeAtoms.ts';
import {selectedPaletteTilesAtom} from '@/stateAtoms/paletteAtoms.ts';
import {addActionToUndoRedoAtom, UndoRedoAction} from '@/stateAtoms/undoRedoAtoms.ts';

import {LS_KEY_PREFIX} from '../constants.ts';

const SCENE_LS_KEY = `${LS_KEY_PREFIX}-scene`;

export interface Slot {
  tileId: string | null;
}
export interface Level {
  id: string;
  visible: boolean;
  // position: if order in array would be a problem
  slots: Record<string, Slot>;
}
export interface Scene {
  size: number;
  activeLevel: string;
  levels: Level[];
}

export const sceneAtomInitialValue: Scene = {
  size: 5,
  activeLevel: '0',
  levels: [
    {
      id: '0',
      visible: true,
      slots: {},
    },
  ],
};

/**
 * Hydrating from Local Storage on First Render
 * https://github.com/pmndrs/jotai/discussions/1737
 *
 * `getOnInit` (optional, by default false): A boolean value indicating whether to get item from storage on initialization.
 * Note that in an SPA with getOnInit either not set or false you will always get the initial value instead of the stored
 * value on initialization. If the stored value is preferred set getOnInit to true.
 */
export const sceneAtom = atomWithStorage<Scene>(SCENE_LS_KEY, sceneAtomInitialValue, undefined, {getOnInit: true});

interface Update {
  levelId: string;
  slotsIds: string[];
  finished: boolean;
}

let undoRedoTempActions: UndoRedoAction | null = null;

const getRandomPaletteTile = (paletteTiles: string[]) => {
  return paletteTiles[Math.floor(Math.random() * paletteTiles.length)];
};

export const sceneLevelTileAtom = atom(null, (get, set, update: Update) => {
  const mode = get(modeAtom);
  if (mode === 'select') {
    return;
  }

  const scene = get(sceneAtom);
  const fromSlots: Slot[] = update.slotsIds.map(slotId => {
    const fromLevel = scene.levels.find(level => level.id === update.levelId);
    if (!fromLevel) {
      throw new Error(`Missing level ${update.levelId}`);
    }
    return fromLevel.slots[slotId] ?? {tileId: null};
    //return scene.levels[update.levelId].slots[slotId] ?? {tileId: null};
  });

  const selectedPaletteTiles = get(selectedPaletteTilesAtom);
  const toSlots = fromSlots.map(() => {
    if (mode === 'paint') {
      return {
        tileId: getRandomPaletteTile(selectedPaletteTiles),
      };
    }
    // erase
    return {
      tileId: null,
    };
  });

  if (fromSlots.every((slot, index) => slot.tileId === toSlots[index].tileId)) {
    if (update.finished && undoRedoTempActions) {
      set(addActionToUndoRedoAtom, undoRedoTempActions);
      undoRedoTempActions = null;
    }
    return;
  }

  const slots: Level['slots'] = {};
  update.slotsIds.forEach((slotId, index) => {
    slots[slotId] = toSlots[index];
  });

  set(sceneAtom, prevState => ({
    ...prevState,
    levels: prevState.levels.map(lvl => {
      if (lvl.id === update.levelId) {
        return {
          ...lvl,
          slots: {
            ...lvl.slots,
            ...slots,
          },
        };
      }
      return lvl;
    }),
  }));

  const undoRedoSlots: UndoRedoAction['slots'] = {};
  update.slotsIds.forEach((slotId, index) => {
    undoRedoSlots[slotId] = {
      from: fromSlots[index],
      to: toSlots[index],
    };
  });

  // only add to redoUndo when finished (for mousedown painting)
  if (update.finished) {
    undoRedoTempActions = null;
    set(addActionToUndoRedoAtom, {
      // type: mode,
      level: update.levelId,
      slots: undoRedoSlots,
    });
  } else {
    undoRedoTempActions = {
      level: update.levelId,
      slots: {...undoRedoTempActions?.slots, ...undoRedoSlots},
    };
  }
});

// not very helpful because of React key rule
// export const sceneLevelAtomsAtom = splitAtom(sceneLevelsAtom);

// ------

const SCENE_SIZE_LS_KEY = `${LS_KEY_PREFIX}-scene-size`;

export const sceneSizeAtom = atomWithStorage(SCENE_SIZE_LS_KEY, 5);

// ------

const SCENE_SCALE_LS_KEY = `${LS_KEY_PREFIX}-scene-scale`;

export const sceneScaleAtom = atomWithStorage(SCENE_SCALE_LS_KEY, 6);

// ------
