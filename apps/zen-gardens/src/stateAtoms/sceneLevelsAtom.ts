import {arrayMove} from '@dnd-kit/sortable';
import {atom} from 'jotai';

import {Scene, sceneAtom} from '@/stateAtoms/sceneAtoms.ts';

// get levels
// -----------------------
export const sceneLevelsAtom = atom(get => {
  return get(sceneAtom).levels;
});

// set and get active level
// -----------------------
export const sceneActiveLevelAtom = atom(
  get => {
    return get(sceneAtom).activeLevel;
  },
  (get, set, update: {id: string}) => {
    set(sceneAtom, (prevState): Scene => {
      return {
        ...prevState,
        activeLevel: update.id,
      };
    });
  }
);

// toggle visibility
// -----------------------

export const toggleLevelVisibilityAtom = atom(null, (get, set, update: {id: string}) => {
  set(sceneAtom, (prevState): Scene => {
    return {
      ...prevState,
      levels: prevState.levels.map(level => {
        if (level.id === update.id) {
          return {
            ...level,
            visible: !level.visible,
          };
        }
        return level;
      }),
    };
  });
});

// add
// -----------------------
export const addLevelAtom = atom(null, (get, set, update: {id: string; pos: 'after' | 'before'}) => {
  set(sceneAtom, prevState => {
    const _index = prevState.levels.findIndex(level => level.id === update.id);
    const index = update.pos === 'after' ? _index + 1 : _index;
    const nextId = (Math.max(...prevState.levels.map(level => Number(level.id))) + 1).toString();
    return {
      ...prevState,
      levels: [
        ...prevState.levels.slice(0, index),
        {
          id: nextId,
          visible: true,
          slots: {},
        },
        ...prevState.levels.slice(index),
      ],
    };
  });
});

// remove
// -----------------------

/**
 * strategy: get first bellow level if we can
 */
const getNextActiveLevelAfterRemoveIt = (id: string, levels: Scene['levels']): string => {
  const indexToBeRemoved = levels.findIndex(level => level.id === id);
  return indexToBeRemoved === 0 ? levels[1].id : levels[indexToBeRemoved - 1].id;
};

export const removeLevelAtom = atom(null, (get, set, update: {id: string}) => {
  if (get(sceneAtom).levels.length > 1) {
    set(sceneAtom, (prevState): Scene => {
      const activeLevel =
        prevState.activeLevel === update.id
          ? getNextActiveLevelAfterRemoveIt(prevState.activeLevel, prevState.levels)
          : prevState.activeLevel;

      return {
        ...prevState,
        activeLevel,
        levels: prevState.levels.filter(level => level.id !== update.id),
      };
    });
  }
});

// move / reorder
// -----------------------

export const moveLevelAtom = atom(null, (get, set, update: {fromId: string; toId: string}) => {
  set(sceneAtom, (prevState): Scene => {
    const fromIndex = prevState.levels.findIndex(level => level.id === update.fromId);
    const toIndex = prevState.levels.findIndex(level => level.id === update.toId);
    const levels = arrayMove(prevState.levels, fromIndex, toIndex);

    return {
      ...prevState,
      levels,
    };
  });
});
