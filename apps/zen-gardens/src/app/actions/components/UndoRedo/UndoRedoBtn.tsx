import {ActionIcon} from '@mantine/core';
import {IconArrowBackUp, IconArrowForwardUp} from '@tabler/icons-react';
import {useAtomValue, useSetAtom} from 'jotai';
import {ReactNode} from 'react';

import useColor from '@/app/actions/hooks/useColor.ts';
import Tooltip from '@/components/Tooltip/Tooltip';
import {isRedoEnabledAtom, isUndoEnabledAtom, redoActionAtom, undoActionAtom} from '@/stateAtoms/undoRedoAtoms.ts';

interface UndoRedoBtnProps {
  label: string;
  id: 'undo' | 'redo';
  disabled: boolean;
  onClick: () => void;
}

const ICON_SET: Record<UndoRedoBtnProps['id'], ReactNode> = {
  undo: <IconArrowBackUp size={22} />,
  redo: <IconArrowForwardUp size={22} />,
} as const;

const UndoRedoBtn = ({label, id, disabled, onClick}: UndoRedoBtnProps) => {
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
        onClick={() => {
          onClick();
        }}
      >
        {ICON_SET[id]}
      </ActionIcon>
    </Tooltip>
  );
};

export const UndoBtn = ({label}: Pick<UndoRedoBtnProps, 'label'>) => {
  const disabled = !useAtomValue(isUndoEnabledAtom);
  const undoAction = useSetAtom(undoActionAtom);

  return <UndoRedoBtn label={label} id="undo" disabled={disabled} onClick={undoAction} />;
};

export const RedoBtn = ({label}: Pick<UndoRedoBtnProps, 'label'>) => {
  const disabled = !useAtomValue(isRedoEnabledAtom);
  const redoAction = useSetAtom(redoActionAtom);

  return <UndoRedoBtn label={label} id="redo" disabled={disabled} onClick={redoAction} />;
};
