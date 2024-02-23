import {useSortable} from '@dnd-kit/sortable';
import {ActionIcon} from '@mantine/core';
import {IconGripVertical} from '@tabler/icons-react';

import useColor from '@/app/actions/hooks/useColor.ts';
import styles from '@/app/levelsGrid/components/LevelRow/styles.module.scss';

interface DragHandlerProps {
  id: string;
}

const DragHandler = ({id}: DragHandlerProps) => {
  const {attributes, listeners} = useSortable({id});
  const color = useColor({active: false});

  return (
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
  );
};

export default DragHandler;
