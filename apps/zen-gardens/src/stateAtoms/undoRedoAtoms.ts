// selectedPaletteTilesAtom
// -----------------------------

import {atom} from 'jotai';

// import {atomWithReset} from 'jotai/utils';
import {Mode} from '@/stateAtoms/modeAtoms.ts';
import {sceneAtom} from '@/stateAtoms/sceneAtoms.ts';

/**
 * Action base undo/redo
 *
 * Important note
 * - random painting effect will not be preserved - it will be random on every undo/redo step
 */

// example

// fill all/random
// const fillAction: Action = {
//   mode: 'paint',
//   selectedTilesIds: ['t1', 't2'],
//   level: 0,
//   slots: [
//     // 16x16 -> 256 slots
//     {slotId: '1:1', tileId: 'grass'},
//     {slotId: '1:2', tileId: 'water'},
//   ],
// };
//
// // paint single/drag/random
// const paintAction: Action = {
//   mode: 'paint',
//   selectedTilesIds: ['t1', 't2'],
//   level: 0,
//   slots: [
//     {slotId: '1:1', tileId: 'grass'},
//     {slotId: '1:2', tileId: 'water'},
//   ],
// };

interface UndoRedoActionSlot {
  tileId: string | null;
  slotId: string;
}

interface UndoRedoAction {
  mode: Mode;
  selectedPaletteTiles: string[];
  level: number;
  slots: UndoRedoActionSlot[];
}
export interface UndoRedo {
  redoActions: UndoRedoAction[];
  undoActions: UndoRedoAction[];
}

const undoRedoAtomInitialValue: UndoRedo = {
  redoActions: [],
  undoActions: [],
};

export const undoRedoAtom = atom<UndoRedo>(undoRedoAtomInitialValue);

export const addActionToUndoRedoAtom = atom(null, (get, set, newAction: UndoRedoAction) => {
  set(undoRedoAtom, prevState => {
    return {
      undoActions: [...prevState.undoActions, newAction],
      // reset redo list on user action
      redoActions: [],
    };
  });

  console.log('%c [mr] undoRedoAtom', 'background-color:Gold; color: black', get(undoRedoAtom));
});

// TODO add loop
// TODO skip update tile when the same tile!!!
// TODO mode: erase - support it!

export const undoActionAtom = atom(null, (get, set) => {
  const {undoActions} = get(undoRedoAtom);
  const action = undoActions.at(-1);

  if (!action) {
    return;
  }

  set(sceneAtom, prevState => ({
    ...prevState,
    levels: prevState.levels.map(lvl => {
      if (lvl.id === action.level) {
        return {
          ...lvl,
          slots: {
            ...lvl.slots,
            [action.slots[0].slotId]: {tileId: action.slots[0].tileId},
          },
        };
      }
      return lvl;
    }),
  }));

  set(undoRedoAtom, prevState => ({
    undoActions: prevState.undoActions.slice(0, -1),
    redoActions: [...prevState.redoActions, action],
  }));
});

export const redoActionAtom = atom(null, (get, set) => {
  const {redoActions} = get(undoRedoAtom);
  const action = redoActions.at(-1);

  if (!action) {
    return;
  }

  set(sceneAtom, prevState => ({
    ...prevState,
    levels: prevState.levels.map(lvl => {
      if (lvl.id === action.level) {
        return {
          ...lvl,
          slots: {
            ...lvl.slots,
            [action.slots[0].slotId]: {tileId: action.selectedPaletteTiles[0]},
          },
        };
      }
      return lvl;
    }),
  }));

  set(undoRedoAtom, prevState => ({
    undoActions: [...prevState.undoActions, action],
    redoActions: prevState.redoActions.slice(0, -1),
  }));
});

export const isUndoEnabledAtom = atom(get => {
  const {undoActions} = get(undoRedoAtom);
  return undoActions.length > 0;
});

export const isRedoEnabledAtom = atom(get => {
  const {redoActions} = get(undoRedoAtom);
  return redoActions.length > 0;
});
