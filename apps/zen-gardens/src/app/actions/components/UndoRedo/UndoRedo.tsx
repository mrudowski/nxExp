import {ActionIcon, Tooltip} from '@mantine/core';
import React from 'react';

import styles from './styles.module.scss';
import {RedoBtn, UndoBtn} from './UndoRedoBtn';

const UndoRedo = () => {
  return (
    <Tooltip.Group>
      <ActionIcon.Group className={styles.undoRedo}>
        <UndoBtn label="Undo" />
        <RedoBtn label="Redo" />
      </ActionIcon.Group>
    </Tooltip.Group>
  );
};

export default UndoRedo;
