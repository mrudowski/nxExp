import {produce} from 'immer';
import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';

type State = {
  characters: {name: string}[];
};

type Action = {
  addCharacter: (character: {name: string}) => void;
  addCharacterWithImmerInline: (character: {name: string}) => void;
  addCharacterWithImmerMiddleware: (character: {name: string}) => void;
  removeAllCharacters: () => void;
};

export type CharactersStore = State & Action;

const emptyArray: State['characters'] = [];

// we can add switch reducer and fully typed dispatch to Zustand too...

// ehh:
// - in js: create(set =>
// - in ts: create<Store>()(set =>      <--- additional () is a workaround for microsoft/TypeScript#10571.

export const useCharactersStore = create<CharactersStore>()(
  immer(set => ({
    characters: emptyArray,
    // ❗️ by default it merge one level - nice to known because with it we have to do:
    // for example when replace flag is on: https://docs.pmnd.rs/zustand/guides/immutable-state-and-merging#replace-flag
    // addCharacter: (character: {name: string}) => set(state => ({...state, characters: [...state.characters, character]}), true),
    addCharacter: (character: {name: string}) => set(state => ({characters: [...state.characters, character]})),
    addCharacterWithImmerInline: (character: {name: string}) =>
      // :( redux toolkit it's a lot cleaner here
      set(
        produce((state: State) => {
          state.characters.push(character);
        })
      ),
    addCharacterWithImmerMiddleware: (character: {name: string}) =>
      set(state => {
        state.characters.push(character);
      }),
    removeAllCharacters: () => set({characters: emptyArray}),
  }))
);

// Remember about `unstable_batchedUpdates` when we call it outside react callbacks and react < 18:
// https://docs.pmnd.rs/zustand/guides/event-handler-in-pre-react-18
export const removeAllCharactersStandaloneAlt = () => useCharactersStore.setState({characters: emptyArray});
export const removeAllCharactersStandalone = () => useCharactersStore.getState().removeAllCharacters();
