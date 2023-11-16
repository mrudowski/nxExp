import {IconMoonFilled, IconSunFilled} from '@tabler/icons-react';
import clsx from 'clsx';
import {useAtomValue} from 'jotai';

import {derivedCounterAtom} from '@/state/jotaiAtoms.ts';
import {useThemeContext} from '@/theme';

import styles from './DarkModeSwitch.module.scss';

const DarkModeSwitch = () => {
  const {theme, setTheme} = useThemeContext();
  const counter = useAtomValue(derivedCounterAtom);

  return (
    <div className={styles.darkModeSwitch}>
      <IconSunFilled
        size={18}
        onClick={() => {
          setTheme('light');
        }}
        className={clsx(styles.icon, styles.sun, theme === 'light' && styles.active)}
      />
      <IconMoonFilled
        onClick={() => {
          setTheme('dark');
        }}
        size={16}
        className={clsx(styles.icon, styles.moon, theme === 'dark' && styles.active)}
      />
      {counter}
    </div>
  );
};

export default DarkModeSwitch;
