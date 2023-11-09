import {IconMoonFilled, IconSunFilled} from '@tabler/icons-react';
import clsx from 'clsx';

import {useThemeContext} from '@/theme';

import styles from './DarkModeSwitch.module.scss';

const DarkModeSwitch = () => {
  // const {isDarkMode, toggle} = useDarkMode();
  const {theme, setTheme} = useThemeContext();

  // useEffect(() => {
  //   document.body.classList.toggle('dark-mode', isDarkMode);
  // }, [isDarkMode]);

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
    </div>
  );
};

export default DarkModeSwitch;
