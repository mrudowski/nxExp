import {ActionIcon} from '@mantine/core';
import {IconArrowBackUp, IconArrowForwardUp, IconEye, IconEyeOff} from '@tabler/icons-react';
import {MouseEventHandler, ReactNode} from 'react';

import useColor from '@/app/actions/hooks/useColor.ts';
import Tooltip from '@/components/Tooltip/Tooltip';

interface ActionBtnProps {
  label: string;
  id: 'show' | 'hide' | 'add' | 'remove';
  disabled?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const ICON_SET: Record<ActionBtnProps['id'], ReactNode> = {
  show: <IconEye size={18} />,
  hide: <IconEyeOff size={18} />,
  add: <IconArrowBackUp size={22} />,
  remove: <IconArrowForwardUp size={22} />,
} as const;

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
        {ICON_SET[id]}
      </ActionIcon>
    </Tooltip>
  );
};

export default ActionBtn;
