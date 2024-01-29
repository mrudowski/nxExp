import {useMantineColorScheme} from '@mantine/core';
import {useMediaQuery} from 'usehooks-ts';

const useMantineComputedColorScheme = () => {
  const {colorScheme, toggleColorScheme} = useMantineColorScheme({
    keepTransitions: true,
  });
  // ⚠️⛔️ too slow - so it will return `light` and then `dark` when we in dark mode
  //   const computedColorScheme = useComputedColorScheme('light');
  // faster solution for that but with no refreshing mechanism
  //   const computedColorScheme = window.document.documentElement.getAttribute('data-mantine-color-scheme');
  // alt solution but again without refreshing
  //   const computedColorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  // our old good friend
  const _computedColorScheme = useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light';
  const computedColorScheme = colorScheme === 'auto' ? _computedColorScheme : colorScheme;

  return {computedColorScheme, toggleColorScheme};
};

export default useMantineComputedColorScheme;
