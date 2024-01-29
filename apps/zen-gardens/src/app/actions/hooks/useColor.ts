import {useMantineTheme} from '@mantine/core';

import useMantineComputedColorScheme from '@/hooks/useMantineComputedColorScheme.ts';

const useColor = ({active = false, light = 4, dark = 5}: {active?: boolean; light?: number; dark?: number}) => {
  const theme = useMantineTheme();
  const {computedColorScheme} = useMantineComputedColorScheme();

  if (active) {
    return '';
  }

  return computedColorScheme === 'dark' ? theme.colors.gray[dark] : theme.colors.dark[light];
};

export default useColor;
