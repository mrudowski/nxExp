import {atom, getDefaultStore} from 'jotai';
import {atomWithStorage, createJSONStorage, loadable} from 'jotai/utils';

/**
 * If not specified, the default storage implementation uses:
 * - localStorage for storage/retrieval,
 * - JSON.stringify()/JSON.parse() for serialization/deserialization,
 * - and subscribes to storage events for cross-tab synchronization.
 */
export const counterAtom = atomWithStorage('counter', 0, {
  // needed in next.js
  // https://github.com/pmndrs/jotai/issues/1694
  // https://github.com/pmndrs/jotai/issues/1689
  ...createJSONStorage(() => localStorage),
});

// too simple/bad example only to test derived atom functionality :)
export const derivedCounterAtom = atom(get => {
  const counter = get(counterAtom);
  return Math.pow(counter, 3);
});

// writeOnlyAtom
export const reverseCounterAtom = atom(
  null, // it's a convention to pass `null` for the first argument
  (get, set) => {
    // `update` is any single value we receive for updating this atom
    set(counterAtom, get(counterAtom) * -1);
  }
);

// need <Suspense />
const asyncAtom = atom<Promise<string>>(async () => {
  return new Promise(resolve =>
    setTimeout(() => {
      resolve('resolved after 3 seconds');
    }, 3000)
  );
});

// If you don't want async atoms to suspend or throw to an error boundary (for example, for finer-grained control of loading and error logic)
export const loadableAsyncAtom = loadable(asyncAtom);

const defaultStore = getDefaultStore();
defaultStore.sub(counterAtom, () => {
  console.log(
    '%c [jotaiStore] counterAtom value is changed to',
    'background-color:Gold; color: black',
    defaultStore.get(counterAtom)
  );
});
