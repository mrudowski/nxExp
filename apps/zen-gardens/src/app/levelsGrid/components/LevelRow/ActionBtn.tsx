import {ActionIcon} from '@mantine/core';
import {IconEye, IconEyeOff, IconPlus, IconX} from '@tabler/icons-react';
import {forwardRef, MouseEventHandler, ReactNode} from 'react';

import useColor from '@/app/actions/hooks/useColor.ts';
import Tooltip from '@/components/Tooltip/Tooltip';

interface ActionBtnProps {
  label: string;
  icon: 'show' | 'hide' | 'add' | 'remove';
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const ICON_SET: Record<ActionBtnProps['icon'], ReactNode> = {
  show: <IconEye size={18} />,
  hide: <IconEyeOff size={18} />,
  add: <IconPlus size={18} />,
  remove: <IconX size={18} />,
} as const;

const ActionBtn = forwardRef<HTMLButtonElement, ActionBtnProps>(
  ({label, icon, disabled, onClick}: ActionBtnProps, ref) => {
    const color = useColor({active: false});

    return (
      <Tooltip label={label}>
        <ActionIcon
          ref={ref}
          variant="transparent"
          radius="lg"
          size="sm"
          color={color}
          aria-label={label}
          disabled={disabled}
          onClick={onClick}
        >
          {ICON_SET[icon]}
        </ActionIcon>
      </Tooltip>
    );
  }
);

export default ActionBtn;
