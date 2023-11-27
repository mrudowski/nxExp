'use client';

import {useAtom, useAtomValue, useSetAtom} from 'jotai';

import {counterAtom, loadableAsyncAtom, reverseCounterAtom} from '../../state/jotaiAtoms.ts';
import styles from './JotaiPlayground.module.scss';

const JotaiPlayground = () => {
  // https://jotai.org/docs/utilities/ssr
  // useHydrateAtoms([[counterAtom, 0]]); // countFromServer if any

  const [counter, setCounter] = useAtom(counterAtom);
  const resetCounter = () => setCounter(0);
  const reverseCounter = useSetAtom(reverseCounterAtom);
  const loadableText = useAtomValue(loadableAsyncAtom);

  return (
    <div className={styles.playground}>
      <button
        onClick={() => {
          setCounter(prevCounter => prevCounter + 1);
        }}
      >
        {counter} +
      </button>
      <button onClick={resetCounter}>reset</button>
      <button
        onClick={() => {
          reverseCounter();
        }}
      >
        reverse
      </button>
      {loadableText.state === 'hasData' ? loadableText.data : 'waiting…'}
    </div>
  );
};

export default JotaiPlayground;
