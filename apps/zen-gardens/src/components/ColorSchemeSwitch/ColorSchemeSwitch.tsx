import {Switch, Tooltip, useMantineColorScheme, useMantineTheme} from '@mantine/core';
import {IconMoonFilled, IconSunFilled} from '@tabler/icons-react';
import {useMediaQuery} from 'usehooks-ts';

const ColorSchemeSwitch = () => {
  const theme = useMantineTheme();
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

  const sunIcon = <IconSunFilled size={18} style={{color: theme.colors.yellow[6]}} />;

  const moonIcon = <IconMoonFilled size={18} style={{color: theme.colors.blue[6]}} />;

  const label = computedColorScheme === 'light' ? 'Switch to dark mode' : 'Switch to light mode';

  return (
    <Tooltip label={label} refProp="rootRef">
      <Switch
        size="md"
        color="dark.4"
        onLabel={moonIcon}
        offLabel={sunIcon}
        checked={computedColorScheme !== 'light'}
        onChange={toggleColorScheme}
      />
    </Tooltip>
  );
};

export default ColorSchemeSwitch;
