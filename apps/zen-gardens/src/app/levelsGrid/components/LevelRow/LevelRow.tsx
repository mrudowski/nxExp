import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {ActionIcon} from '@mantine/core';
import {MouseEventHandler} from 'react';

import DragHandler from '@/app/levelsGrid/components/LevelRow/DragHandler.tsx';
import ToggleVisibilityBtn from '@/app/levelsGrid/components/LevelRow/ToggleVisibilityBtn.tsx';

import ActionBtn from './ActionBtn.tsx';
import styles from './styles.module.scss';

interface LevelRowProps {
  id: string;
  visible: boolean;
  active: boolean;
  onActivate: (id: string) => void;
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
  onToggleVisibility: (id: string) => void;
}

const LevelRow = ({id, visible, active, onActivate, onAdd, onRemove, onToggleVisibility}: LevelRowProps) => {
  const {setNodeRef, transform, transition} = useSortable({id});

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleToggleVisibility: MouseEventHandler<HTMLButtonElement> = e => {
    onToggleVisibility(id);
    e.stopPropagation();
  };
  const handleAdd: MouseEventHandler<HTMLButtonElement> = e => {
    onAdd(id);
    e.stopPropagation();
  };
  const handlerRemove: MouseEventHandler<HTMLButtonElement> = e => {
    onRemove(id);
    e.stopPropagation();
  };

  return (
    <div
      key={id}
      role="row"
      aria-label={`level-${id}`}
      aria-selected={active}
      onClick={() => {
        onActivate(id);
      }}
      className={styles.levelRow}
      ref={setNodeRef}
      style={style}
    >
      <DragHandler id={id} />
      <ToggleVisibilityBtn visible={visible} onClick={handleToggleVisibility} />
      <label>level {id}</label>
      <ActionIcon.Group className={styles.actions}>
        <ActionBtn label="Add new layer above it" id="add" onClick={handleAdd} />
        <ActionBtn label="Remove this layer" id="remove" onClick={handlerRemove} />
      </ActionIcon.Group>
    </div>
  );
};

export default LevelRow;
