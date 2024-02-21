import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {restrictToFirstScrollableAncestor, restrictToVerticalAxis} from '@dnd-kit/modifiers';
import {SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy} from '@dnd-kit/sortable';
import {Paper, ScrollArea} from '@mantine/core';
import {useAtom, useAtomValue, useSetAtom} from 'jotai';

import LevelRow from '@/app/levelsGrid/components/LevelRow/LevelRow.tsx';
import {
  addLevelAtom,
  moveLevelAtom,
  removeLevelAtom,
  sceneActiveLevelAtom,
  sceneLevelsAtom,
} from '@/stateAtoms/sceneLevelsAtom.ts';

import styles from './styles.module.scss';

const LevelsGrid = () => {
  const levels = useAtomValue(sceneLevelsAtom);
  const [activeLevelId, setActiveLevelId] = useAtom(sceneActiveLevelAtom);
  const addLevel = useSetAtom(addLevelAtom);
  const removeLevel = useSetAtom(removeLevelAtom);
  const moveLevel = useSetAtom(moveLevelAtom);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleActivate = (id: number) => {
    setActiveLevelId({id});
  };

  const handleAdd = (id: number) => {
    addLevel({id, pos: 'after'});
  };
  const handleRemove = (id: number) => {
    removeLevel({id});
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const {active, over} = event;

    if (over && active.id !== over.id) {
      moveLevel({fromId: Number(active.id), toId: Number(over.id)});
    }
  };

  const levelsInReverse = [...levels].reverse();

  return (
    <Paper className={styles.levelsGrid}>
      <h2>Layers</h2>
      <div className={styles.scrollWrapper}>
        <ScrollArea className={styles.scroll}>
          <div role="grid" aria-label="LevelsGrid">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              modifiers={[restrictToVerticalAxis, restrictToFirstScrollableAncestor]}
              onDragEnd={handleDragEnd}
            >
              <SortableContext items={levelsInReverse} strategy={verticalListSortingStrategy}>
                {levelsInReverse.map(level => {
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
              </SortableContext>
            </DndContext>
          </div>
        </ScrollArea>
      </div>
    </Paper>
  );
};

export default LevelsGrid;