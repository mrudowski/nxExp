import {ActionIcon} from '@mantine/core';
import {IconArrowBackUp, IconArrowForwardUp} from '@tabler/icons-react';
import {MouseEventHandler, ReactNode} from 'react';

import useColor from '@/app/actions/hooks/useColor.ts';
import Tooltip from '@/components/Tooltip/Tooltip';

interface ActionBtnProps {
  label: string;
  id: 'toggleVisibility' | 'add' | 'remove';
  disabled?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const IconSet: Record<ActionBtnProps['id'], ReactNode> = {
  toggleVisibility: <IconArrowBackUp size={22} />,
  add: <IconArrowBackUp size={22} />,
  remove: <IconArrowForwardUp size={22} />,
};

const ActionBtn = ({label, id, disabled, onClick}: ActionBtnProps) => {
  const color = useColor({active: false});

  return (
    <Tooltip label={label}>
      <ActionIcon
        variant="transparent"
        radius="lg"
        size="sm"
        color={color}
        aria-label={label}
        disabled={disabled}
        onClick={onClick}
      >
        {IconSet[id]}
      </ActionIcon>
    </Tooltip>
  );
};

export default ActionBtn;
