import {ActionIcon} from '@mantine/core';
import {IconDotsVertical, IconEye, IconEyeOff, IconPlus, IconTrash} from '@tabler/icons-react';
import {forwardRef, MouseEventHandler, ReactNode} from 'react';

import useColor from '@/app/actions/hooks/useColor.ts';
import Tooltip from '@/components/Tooltip/Tooltip';

interface ActionBtnProps {
  label: string;
  icon: 'show' | 'hide' | 'add' | 'remove' | 'toggleMenu';
  className?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const ICON_SET: Record<ActionBtnProps['icon'], ReactNode> = {
  show: <IconEye size={18} />,
  hide: <IconEyeOff size={18} />,
  add: <IconPlus size={18} />,
  remove: <IconTrash size={16} />,
  toggleMenu: <IconDotsVertical size={16} />,
} as const;

const ActionBtn = forwardRef<HTMLButtonElement, ActionBtnProps>(
  ({label, icon, className, disabled, onClick}: ActionBtnProps, ref) => {
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
          className={className}
        >
          {ICON_SET[icon]}
        </ActionIcon>
      </Tooltip>
    );
  },
);

export default ActionBtn;
