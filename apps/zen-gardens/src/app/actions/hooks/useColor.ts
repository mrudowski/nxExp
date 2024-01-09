import {useMantineColorScheme, useMantineTheme} from '@mantine/core';

const useColor = ({active}: {active: boolean}) => {
  const theme = useMantineTheme();
  const {colorScheme} = useMantineColorScheme();

  if (active) {
    return '';
  }

  return colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.dark[3];
};

export default useColor;
