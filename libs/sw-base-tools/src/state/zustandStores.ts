import {create} from 'zustand';

export type CharactersStore = {
  characters: {name: string}[];
  addCharacter: (character: {name: string}) => void;
  removeAllCharacters: () => void;
};

// we can add switch reducer and fully typed dispatch to Zustand too...
export const useCharactersStore = create<CharactersStore>(set => ({
  characters: [],
  addCharacter: (character: {name: string}) => set(state => ({characters: [...state.characters, character]})),
  removeAllCharacters: () => set({characters: []}),
}));
