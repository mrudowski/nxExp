import {createContext} from 'react';

import {Theme} from '@/theme/types.ts';

export const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
}>({
  theme: 'light',
  setTheme: () => {
    // by purpose
  },
});
