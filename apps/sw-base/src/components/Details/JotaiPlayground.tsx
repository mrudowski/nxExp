import {useAtom, useAtomValue, useSetAtom} from 'jotai/index';

import {counterAtom, loadableAsyncAtom, reverseCounterAtom} from '@/state/jotaiAtoms.ts';

const JotaiPlayground = () => {
  const [counter, setCounter] = useAtom(counterAtom);
  const resetCounter = () => setCounter(0);
  const reverseCounter = useSetAtom(reverseCounterAtom);
  const loadableText = useAtomValue(loadableAsyncAtom);

  return (
    <div className="playground">
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
