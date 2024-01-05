import {ActionIcon, Tooltip} from '@mantine/core';
import React from 'react';

import ModeSwitchBtn from './ModeSwitchBtn';
import styles from './styles.module.scss';

// SegmentedControl as alt solution
// https://mantine.dev/core/segmented-control/

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
