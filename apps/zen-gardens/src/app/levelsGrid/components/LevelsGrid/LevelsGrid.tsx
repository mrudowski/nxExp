import {Paper, ScrollArea} from '@mantine/core';
import {useAtom, useAtomValue, useSetAtom} from 'jotai';

import LevelRow from '@/app/levelsGrid/components/LevelRow/LevelRow.tsx';
import {addLevelAtom, removeLevelAtom, sceneActiveLevelAtom, sceneLevelsAtom} from '@/stateAtoms/sceneLevelsAtom.ts';

import styles from './styles.module.scss';

const LevelsGrid = () => {
  const levels = useAtomValue(sceneLevelsAtom);
  const [activeLevelId, setActiveLevelId] = useAtom(sceneActiveLevelAtom);
  const addLevel = useSetAtom(addLevelAtom);
  const removeLevel = useSetAtom(removeLevelAtom);

  const handleActivate = (id: number) => {
    setActiveLevelId({id});
  };

  const handleAdd = (id: number) => {
    addLevel({id, pos: 'after'});
  };
  const handleRemove = (id: number) => {
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
                <LevelRow
                  key={level.id}
                  id={level.id}
                  active={activeLevelId === level.id}
                  onActivate={handleActivate}
                  onAdd={handleAdd}
                  onRemove={handleRemove}
                />
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </Paper>
  );
};

export default LevelsGrid;
