// selectedPaletteTilesAtom
// -----------------------------

import {atom} from 'jotai';
import {atomWithReset} from 'jotai/utils';

import {Mode} from '@/stateAtoms/modeAtoms.ts';

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
  actions: UndoRedoAction[];
  index: number;
}

const undoRedoAtomInitialValue: UndoRedo = {
  actions: [],
  index: 0,
};

export const undoRedoAtom = atomWithReset<UndoRedo>(undoRedoAtomInitialValue);

export const addActionToUndoRedoAtom = atom(null, (get, set, newAction: UndoRedoAction) => {
  set(undoRedoAtom, prevState => ({
    actions: [...prevState.actions, newAction],
    index: prevState.index + 1,
  }));

  console.log('%c [mr] undoRedoAtom', 'background-color:Gold; color: black', get(undoRedoAtom));
});

export const isUndoActiveAtom = atom(get => {
  const {index} = get(undoRedoAtom);
  return index > 0 && index;
});

export const isRedoActiveAtom = atom(get => {
  const {index, actions} = get(undoRedoAtom);
  return index < actions.length - 1;
});
