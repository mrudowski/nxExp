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
  changeLevelNameAtom,
  moveLevelAtom,
  removeLevelAtom,
  sceneActiveLevelAtom,
  sceneLevelsAtom,
  showOnlyOneLevelAtom,
  toggleLevelVisibilityAtom,
} from '@/stateAtoms/levels/sceneLevelsAtom.ts';

import styles from './styles.module.scss';

const LevelsGrid = () => {
  const levels = useAtomValue(sceneLevelsAtom);
  const [activeLevelId, setActiveLevelId] = useAtom(sceneActiveLevelAtom);
  const addLevel = useSetAtom(addLevelAtom);
  const removeLevel = useSetAtom(removeLevelAtom);
  const moveLevel = useSetAtom(moveLevelAtom);
  const toggleLevelVisibility = useSetAtom(toggleLevelVisibilityAtom);
  const showOnlyOneLevel = useSetAtom(showOnlyOneLevelAtom);
  const changeLevelName = useSetAtom(changeLevelNameAtom);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleActivate = (id: string) => {
    setActiveLevelId({id});
  };
  const handleAdd = (id: string) => {
    addLevel({id, pos: 'after'});
  };
  const handleRemove = (id: string) => {
    removeLevel({id});
  };
  const handleToggleVisibility = (id: string) => {
    toggleLevelVisibility({id});
  };
  const handleShowOnlyOne = (id: string) => {
    showOnlyOneLevel({id});
  };
  const handleChangeName = (id: string, name: string) => {
    changeLevelName({id, name});
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const {active, over} = event;

    if (over && active.id !== over.id) {
      moveLevel({fromId: active.id as string, toId: over.id as string});
    }
  };

  const levelsInReverse = [...levels].reverse();

  return (
    <Paper className={styles.levelsGrid}>
      <h2>Layers</h2>
      <div className={styles.scrollWrapper}>
        <ScrollArea scrollbars="y" className={styles.scroll}>
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
                      name={level.name}
                      active={activeLevelId === level.id}
                      visible={level.visible}
                      onActivate={handleActivate}
                      onAdd={handleAdd}
                      onRemove={handleRemove}
                      onToggleVisibility={handleToggleVisibility}
                      onShowOnlyOne={handleShowOnlyOne}
                      onChangeName={handleChangeName}
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
