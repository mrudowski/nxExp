import {ActionIcon, useMantineColorScheme, useMantineTheme} from '@mantine/core';
import {IconBrush, IconEraser, IconPointer} from '@tabler/icons-react';
import {useAtom} from 'jotai';
import {ReactNode} from 'react';

import Tooltip from '@/components/Tooltip/Tooltip';
import {Mode, modeAtom} from '@/stateAtoms/modeAtoms.ts';

interface ModeSwitchBtnProps {
  label: string;
  id: Mode;
}

const IconSet: Record<Mode, ReactNode> = {
  paint: <IconBrush size={22} />,
  erase: <IconEraser size={22} />,
  select: <IconPointer size={22} />,
};

/**
 * This approach:
 * put everything what we can (theme, colorScheme, mode, setMode)
 * in leaf (so low as we can)
 *
 * pros:
 * - no props drilling
 * - parent is not aware of inner structure/needs of their children
 *
 * cons:
 * - we ask about theme, colorScheme and mode 3 times instead of 1 - but it's only a simple getters
 * - we have hardcoded deps in it by using hooks (it's not a dump component) - but won't use it outside
 *
 *
 * Alternative approach:
 * use parent as a container component (pattern)
 */

const useColor = ({active}: {active: boolean}) => {
  const theme = useMantineTheme();
  const {colorScheme} = useMantineColorScheme();

  if (active) {
    return '';
  }

  return colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.dark[3];
};

const ModeSwitchBtn = ({label, id}: ModeSwitchBtnProps) => {
  const [mode, setMode] = useAtom(modeAtom);
  const color = useColor({active: mode === id});

  return (
    <Tooltip label={label}>
      <ActionIcon
        variant="transparent"
        radius="lg"
        size="sm"
        color={color}
        aria-label={label}
        onClick={() => {
          setMode(id);
        }}
      >
        {IconSet[id]}
      </ActionIcon>
    </Tooltip>
  );
};

export default ModeSwitchBtn;
