import {ActionIcon, useMantineColorScheme, useMantineTheme} from '@mantine/core';
import {IconBrush, IconEraser, IconPointer} from '@tabler/icons-react';

import Tooltip from '@/components/Tooltip/Tooltip';

import styles from './styles.module.scss';

const ModeSwitch = () => {
  const theme = useMantineTheme();
  const {colorScheme} = useMantineColorScheme();

  const commonProps = {
    variant: 'transparent',
    radius: 'lg',
    size: 'sm',
    color: colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.dark[2],
  };

  return (
    <Tooltip.Group>
      <ActionIcon.Group className={styles.modeSwitch}>
        <Tooltip label="Paint">
          <ActionIcon {...commonProps} aria-label="Paint" color="">
            <IconBrush size={22} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Erase">
          <ActionIcon {...commonProps} aria-label="Erase">
            <IconEraser size={22} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Select">
          <ActionIcon {...commonProps} aria-label="Select">
            <IconPointer size={22} />
          </ActionIcon>
        </Tooltip>
      </ActionIcon.Group>
    </Tooltip.Group>
  );
};

export default ModeSwitch;
