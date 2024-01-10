// selectedPaletteTilesAtom
// -----------------------------

import {atom} from 'jotai';

// import {atomWithReset} from 'jotai/utils';
import {Level, Scene, sceneAtom, Slot} from '@/stateAtoms/sceneAtoms.ts';

/**
 * Action base undo/redo + diffs
 */

interface UndoRedoActionSlot {
  from: Slot;
  to: Slot;
}

interface UndoRedoAction {
  // type: 'paint' | 'erase';
  level: number;
  slots: Record<string, UndoRedoActionSlot>;
}
export interface UndoRedo {
  redoActions: UndoRedoAction[];
  undoActions: UndoRedoAction[];
}

const getSlots = (undoRedoSlots: UndoRedoAction['slots'], field: 'from' | 'to'): Level['slots'] => {
  const slots: Level['slots'] = {};
  Object.entries(undoRedoSlots).forEach(([slotId, slotValue]) => {
    slots[slotId] = {
      tileId: slotValue[field].tileId,
    };
  });
  return slots;
};

const setSlots = (newSlots: Record<string, Slot>, levelId: number) => (prevState: Scene) => ({
  ...prevState,
  levels: prevState.levels.map(lvl => {
    if (lvl.id === levelId) {
      return {
        ...lvl,
        slots: {
          ...lvl.slots,
          ...newSlots,
        },
      };
    }
    return lvl;
  }),
});

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

export const undoActionAtom = atom(null, (get, set) => {
  const {undoActions} = get(undoRedoAtom);
  const action = undoActions.at(-1);

  if (!action) {
    return;
  }

  const newSlots = getSlots(action.slots, 'from');
  set(sceneAtom, setSlots(newSlots, action.level));

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

  const newSlots = getSlots(action.slots, 'to');
  set(sceneAtom, setSlots(newSlots, action.level));

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
