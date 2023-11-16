import {useAtom, useAtomValue, useSetAtom} from 'jotai';
import {ReactNode} from 'react';

import {counterAtom, loadableAsyncAtom, reverseCounterAtom} from '@/state/jotaiAtoms.ts';

import Avatar from '../Avatar/Avatar.tsx';
import styles from './Details.module.scss';

type ListProps = {
  name: string;
  children: ReactNode;
};

const Details = ({name, children}: ListProps) => {
  const [counter, setCounter] = useAtom(counterAtom);
  const resetCounter = () => setCounter(0);
  const reverseCounter = useSetAtom(reverseCounterAtom);
  const loadableText = useAtomValue(loadableAsyncAtom);

  return (
    <article className={styles.details}>
      <h2>
        <Avatar name={name} /> {name}
        <button
          onClick={() => {
            setCounter(counter => counter + 1);
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
      </h2>
      {children}
    </article>
  );
};

export default Details;
