import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {ActionIcon, Menu} from '@mantine/core';
import React, {MouseEventHandler} from 'react';

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
    stopPropagation(e);
  };
  const handleAdd: MouseEventHandler<HTMLButtonElement> = e => {
    onAdd(id);
    stopPropagation(e);
  };
  const handlerRemove: MouseEventHandler<HTMLButtonElement> = e => {
    onRemove(id);
    stopPropagation(e);
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
        <ActionBtn label="Add new layer above it" icon="add" onClick={handleAdd} />
        <Menu withArrow offset={0} arrowSize={8} width={240}>
          <Menu.Target>
            {/* Cannot use `id` prop because `Menu` use it too */}
            <ActionBtn label="Remove this layer" icon="remove" onClick={stopPropagation} />
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>Are you sure you want to remove this layer?</Menu.Label>
            <Menu.Item color="red" onClick={handlerRemove}>
              Yes, remove this layer
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </ActionIcon.Group>
    </div>
  );
};

export default LevelRow;

function stopPropagation(e: React.MouseEvent<HTMLButtonElement>) {
  e.stopPropagation();
}
