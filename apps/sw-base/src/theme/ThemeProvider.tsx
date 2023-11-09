import {ReactNode, useCallback, useEffect, useMemo, useState} from 'react';
import {useMediaQuery, useUpdateEffect} from 'usehooks-ts';

import {SW_THEME_LS_KEY} from '@/theme/constants.ts';
import {ThemeContext} from '@/theme/ThemeContext.ts';
import {Theme} from '@/theme/types.ts';

const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)';

type ThemeProviderProps = {
  children: ReactNode;
};

const getInitialTheme = (darkOS: boolean) => () => {
  const lsTheme = localStorage.getItem(SW_THEME_LS_KEY);
  if (lsTheme === 'dark' || lsTheme === 'light') {
    return lsTheme;
  }
  return darkOS ? 'dark' : 'light';
};

export const ThemeProvider = ({children}: ThemeProviderProps) => {
  const darkOS = useMediaQuery(COLOR_SCHEME_QUERY);
  const [theme, _setTheme] = useState<Theme>(getInitialTheme(darkOS));

  // we only save to local storage when user explicit set it
  const setTheme = useCallback((theme: Theme) => {
    _setTheme(theme);
    localStorage.setItem(SW_THEME_LS_KEY, theme);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  // Update theme if os prefers changes BUT only when not already set by user
  useUpdateEffect(() => {
    const themeFromOS = darkOS ? 'dark' : 'light';
    // only when not already choose by user
    const lsTheme = localStorage.getItem(SW_THEME_LS_KEY);
    if (!lsTheme) {
      _setTheme(themeFromOS);
    }
  }, [darkOS]);

  // https://blog.thoughtspile.tech/2021/10/04/react-context-dangers/
  // [x] Stabilize context values
  // [ ] Use atomic context values
  const value = useMemo(() => {
    return {
      theme,
      setTheme,
    };
  }, [theme, setTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
