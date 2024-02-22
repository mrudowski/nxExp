import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {ActionIcon} from '@mantine/core';
import {IconGripVertical} from '@tabler/icons-react';
import {MouseEventHandler} from 'react';

import useColor from '@/app/actions/hooks/useColor.ts';

import ActionBtn from './ActionBtn.tsx';
import styles from './styles.module.scss';

interface LevelRowProps {
  id: string;
  active: boolean;
  onActivate: (id: string) => void;
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
}

const LevelRow = ({id, active, onActivate, onAdd, onRemove}: LevelRowProps) => {
  const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id});

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handlerToggleVisibility = () => {
    console.log('TODO');
  };
  const handleAdd: MouseEventHandler<HTMLButtonElement> = e => {
    onAdd(id);
    e.stopPropagation();
  };
  const handlerRemove: MouseEventHandler<HTMLButtonElement> = e => {
    onRemove(id);
    e.stopPropagation();
  };

  const color = useColor({active: false});

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
      <ActionIcon
        variant="transparent"
        radius="lg"
        size="sm"
        {...listeners}
        {...attributes}
        className={styles.dragHandler}
      >
        <IconGripVertical size={18} color={color} stroke={1} />
      </ActionIcon>
      <label>level {id}</label>
      <ActionIcon.Group className={styles.actions}>
        <ActionBtn label="" id="toggleVisibility" onClick={handlerToggleVisibility} />
        <ActionBtn label="" id="add" onClick={handleAdd} />
        <ActionBtn label="" id="remove" onClick={handlerRemove} />
      </ActionIcon.Group>
    </div>
  );
};

export default LevelRow;
