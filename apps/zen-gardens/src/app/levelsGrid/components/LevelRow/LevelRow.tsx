import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {ActionIcon, Menu} from '@mantine/core';
import {IconAlertTriangle} from '@tabler/icons-react';
import React, {MouseEventHandler} from 'react';

import DragHandler from '@/app/levelsGrid/components/LevelRow/DragHandler.tsx';
import ToggleVisibilityBtn from '@/app/levelsGrid/components/LevelRow/ToggleVisibilityBtn.tsx';
import EditableText from '@/components/EditableText/EditableText.tsx';

import ActionBtn from './ActionBtn.tsx';
import styles from './styles.module.scss';

interface LevelRowProps {
  id: string;
  name: string;
  visible: boolean;
  active: boolean;
  onActivate: (id: string) => void;
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
  onToggleVisibility: (id: string) => void;
  onChangeName: (id: string, name: string) => void;
}

const LevelRow = ({
  id,
  name,
  visible,
  active,
  onActivate,
  onAdd,
  onRemove,
  onToggleVisibility,
  onChangeName,
}: LevelRowProps) => {
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
      aria-label={`Layer ${id}`}
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
      <EditableText
        value={name}
        onChange={newValue => {
          onChangeName(id, newValue);
        }}
      />
      <ActionIcon.Group className={styles.actions}>
        <ActionBtn label="Add new layer above it" icon="add" onClick={handleAdd} />
        <Menu withArrow offset={0} arrowSize={8} width={240}>
          <Menu.Target>
            {/* Cannot use `id` prop because `Menu` use it too */}
            <ActionBtn label="Remove this layer" icon="remove" onClick={stopPropagation} />
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label className={styles.menuLabel}>
              <IconAlertTriangle size={24} stroke={1} />
              Are you sure you want to remove this layer? This action cannot be undone.
            </Menu.Label>
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
