import {Paper, ScrollArea} from '@mantine/core';
import {useAtom, useAtomValue, useSetAtom} from 'jotai';

import {addLevelAtom, removeLevelAtom, sceneActiveLevelAtom, sceneLevelsAtom} from '@/stateAtoms/sceneLevelsAtom.ts';

import styles from './styles.module.scss';

const LevelsGrid = () => {
  const levels = useAtomValue(sceneLevelsAtom);
  const [activeLevelId, setActiveLevelId] = useAtom(sceneActiveLevelAtom);
  const addLevel = useSetAtom(addLevelAtom);
  const removeLevel = useSetAtom(removeLevelAtom);

  const clickHandler2 = (id: number) => {
    setActiveLevelId({id});
  };

  const remove = (id: number) => {
    removeLevel({id});
  };

  return (
    <Paper className={styles.levelsGrid}>
      <h2>Layers</h2>
      <div className={styles.scrollWrapper}>
        <ScrollArea className={styles.scroll}>
          <div role="grid" aria-label="LevelsGrid">
            {[...levels].reverse().map(level => {
              return (
                <div
                  key={level.id}
                  role="row"
                  aria-label={`level-${level.id}`}
                  onClick={() => {
                    clickHandler2(level.id);
                  }}
                >
                  level {level.id} {activeLevelId}
                  {activeLevelId === level.id ? <>(x)</> : <>( )</>}
                  <button
                    onClick={e => {
                      addLevel({id: level.id, pos: 'after'});
                      e.stopPropagation();
                    }}
                  >
                    +
                  </button>
                  <button
                    onClick={e => {
                      remove(level.id);
                      e.stopPropagation();
                    }}
                  >
                    x
                  </button>
                  {/*return <PaletteTile key={tile.id} tile={tile} />;*/}
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </Paper>
  );
};

export default LevelsGrid;
