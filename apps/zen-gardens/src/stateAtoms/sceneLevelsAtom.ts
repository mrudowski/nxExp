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
  (get, set, update: {id: number}) => {
    set(sceneAtom, (prevState): Scene => {
      return {
        ...prevState,
        activeLevel: update.id,
      };
    });
  }
);

// add
// -----------------------
export const addLevelAtom = atom(null, (get, set, update: {id: number; pos: 'after' | 'before'}) => {
  set(sceneAtom, prevState => {
    const _index = prevState.levels.findIndex(level => level.id === update.id);
    const index = update.pos === 'after' ? _index + 1 : _index;
    const nextId = Math.max(...prevState.levels.map(level => level.id)) + 1;
    return {
      ...prevState,
      levels: [
        ...prevState.levels.slice(0, index),
        {
          id: nextId,
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
const getNextActiveLevelAfterRemoveIt = (id: number, levels: Scene['levels']): number => {
  const indexToBeRemoved = levels.findIndex(level => level.id === id);
  return indexToBeRemoved === 0 ? levels[1].id : levels[indexToBeRemoved - 1].id;
};

export const removeLevelAtom = atom(null, (get, set, update: {id: number}) => {
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
