import {Switch, useMantineTheme} from '@mantine/core';
import {IconCloudFilled, IconSparkles} from '@tabler/icons-react';

import Tooltip from '@/components/Tooltip/Tooltip.tsx';
import useMantineComputedColorScheme from '@/hooks/useMantineComputedColorScheme.ts';

import styles from './styles.module.scss';

const ColorSchemeSwitch = () => {
  const theme = useMantineTheme();
  const {computedColorScheme, toggleColorScheme} = useMantineComputedColorScheme();

  const sunIcon = <IconCloudFilled size={18} style={{color: theme.colors.blue[0]}} />;

  const moonIcon = <IconSparkles size={18} style={{color: theme.colors.blue[2]}} />;

  const label = computedColorScheme === 'light' ? 'Switch to dark mode' : 'Switch to light mode';

  return (
    <div className={styles.switch}>
      <Tooltip label={label} refProp="rootRef">
        <Switch
          size="md"
          color="blue.9"
          onLabel={moonIcon}
          offLabel={sunIcon}
          checked={computedColorScheme !== 'light'}
          onChange={toggleColorScheme}
        />
      </Tooltip>
    </div>
  );
};

export default ColorSchemeSwitch;
