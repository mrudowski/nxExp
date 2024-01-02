import {ActionIcon} from '@mantine/core';

import Tooltip from '@/components/Tooltip/Tooltip';

import ModeSwitchBtn from './ModeSwitchBtn';
import styles from './styles.module.scss';

const ModeSwitch = () => {
  return (
    <Tooltip.Group>
      <ActionIcon.Group className={styles.modeSwitch}>
        <ModeSwitchBtn id="paint" label="Paint" />
        <ModeSwitchBtn id="erase" label="Erase" />
        <ModeSwitchBtn id="select" label="Select" />
      </ActionIcon.Group>
    </Tooltip.Group>
  );
};

export default ModeSwitch;
