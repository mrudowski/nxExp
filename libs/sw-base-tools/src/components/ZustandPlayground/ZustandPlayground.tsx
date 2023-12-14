'use client';

/**
 * there are no major differences in approach between Zustand and Redux.
 * In both libraries it is recommended that you manually apply render optimizations by using selectors.
 */

import {createSelector} from 'reselect';
import {useShallow} from 'zustand/react/shallow';

import {CharactersStore, removeAllCharactersStandalone, useCharactersStore} from '../../state/zustandStores';
import styles from './ZustandPlayground.module.scss';

// 🚨very very bad
const WholeStore = () => {
  const characters = useCharactersStore();

  console.log('%c [mr] WholeStore', 'background-color:Gold; color: black', characters);

  return null;
};

// ✅ stable as hell
const ActionsOnly = () => {
  const addCharacter = useCharactersStore(store => store.addCharacter);
  const addCharacterWithImmerInline = useCharactersStore(store => store.addCharacterWithImmerInline);
  const addCharacterWithImmerMiddleware = useCharactersStore(store => store.addCharacterWithImmerMiddleware);
  const removeAllCharacters = useCharactersStore(store => store.removeAllCharacters);

  console.log('%c [mr] ActionsOnly', 'background-color:Gold; color: black');

  return (
    <>
      <button
        onClick={() => {
          addCharacter({name: 'Tom'});
          addCharacterWithImmerInline({name: 'Jerry'});
          addCharacterWithImmerMiddleware({name: 'Ken'});
        }}
      >
        add 3 characters
      </button>
      <button
        onClick={() => {
          removeAllCharacters();
        }}
      >
        remove all characters
      </button>
      <button
        onClick={() => {
          removeAllCharactersStandalone();
        }}
      >
        remove all characters (standalone without use hook)
      </button>
    </>
  );
};

const CharactersOnly = () => {
  const characters = useCharactersStore(store => store.characters);

  console.log('%c [mr] CharactersOnly', 'background-color:Gold; color: black', characters);

  return (
    <ul>
      {characters.map((character, index) => (
        <li key={index}>{character.name}</li>
      ))}
    </ul>
  );
};

// fine but not need it from v4:
// https://github.com/pmndrs/zustand/discussions/387#discussioncomment-3810458
const firstCharacterOnlySelector = (store: CharactersStore) => store.characters[0];

// ✅ stable because character is not changed
const FirstCharacterOnly = () => {
  const firstCharacter = useCharactersStore(firstCharacterOnlySelector);
  // the same as
  // const firstCharacter = useCharactersStore(store => store.characters[0]);

  console.log('%c [mr] FirstCharacterOnly', 'background-color:Gold; color: black', firstCharacter);

  return <div>first character name: {firstCharacter?.name}</div>;
};

// ✅ stable thanks to useShallow
const FirstCharacterOnlyButInArray = () => {
  const firstCharacter = useCharactersStore(useShallow((store: CharactersStore) => [store.characters[0]]));
  console.log('%c [mr] FirstCharacterOnlyButInArray', 'background-color:Gold; color: black', firstCharacter);

  return <div>first character name: {firstCharacter[0]?.name}</div>;
};

// ✅ stable thanks to `createSelector` from `Reselect` (like redux toolkit)
const firstCharacterOnlyButInArraySelector = createSelector(firstCharacterOnlySelector, firstCharacter => {
  return [firstCharacter];
});
const FirstCharacterOnlyButInArrayAlt = () => {
  const firstCharacter = useCharactersStore(firstCharacterOnlyButInArraySelector);
  console.log('%c [mr] FirstCharacterOnlyButInArrayAlt', 'background-color:Gold; color: black', firstCharacter);

  return <div>first character name: {firstCharacter[0]?.name}</div>;
};

// TODO
// - selector with id
// - async?  - https://github.com/pmndrs/zustand?tab=readme-ov-file#async-actions

const ZustandPlayground = () => {
  return (
    <div className={styles.playground}>
      <WholeStore />
      <ActionsOnly />
      <CharactersOnly />
      <div>
        <FirstCharacterOnly />
        <FirstCharacterOnlyButInArray />
        <FirstCharacterOnlyButInArrayAlt />
      </div>
    </div>
  );
};

export default ZustandPlayground;
