import {Paper, ScrollArea} from '@mantine/core';
import {useAtomValue, useSetAtom} from 'jotai';

import {addLevelAfterAtom, sceneLevelsAtom} from '@/stateAtoms/sceneAtoms.ts';

import styles from './styles.module.scss';

const LevelsGrid = () => {
  const levels = useAtomValue(sceneLevelsAtom);
  // TODO selected current level!
  const addLevel = useSetAtom(addLevelAfterAtom);

  const clickHandler = () => {
    addLevel({id: 0});
  };

  return (
    <Paper className={styles.levelsGrid}>
      <h2>Layers</h2>
      <button onClick={clickHandler}>+</button>
      <div className={styles.scrollWrapper}>
        <ScrollArea className={styles.scroll}>
          <div role="grid" aria-label="LevelsGrid">
            {levels.map(level => {
              return (
                <div key={level.id} role="row" aria-label={`level-${level.id}`}>
                  level {level.id}
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
