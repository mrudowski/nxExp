import {useMantineColorScheme, useMantineTheme} from '@mantine/core';

const useColor = ({active = false, light = 4, dark = 5}: {active?: boolean; light?: number; dark?: number}) => {
  const theme = useMantineTheme();
  const {colorScheme} = useMantineColorScheme();

  if (active) {
    return '';
  }

  return colorScheme === 'dark' ? theme.colors.gray[dark] : theme.colors.dark[light];
};

export default useColor;
