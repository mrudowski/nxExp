import {createTheme, localStorageColorSchemeManager, rem} from '@mantine/core';

import {LS_KEY_PREFIX} from '../constants.ts';

export const theme = createTheme({
  fontFamily: 'Lato, sans-serif',
  primaryColor: 'cyan',
  cursorType: 'pointer',
  fontSizes: {
    xs: rem(14),
    sm: rem(14),
    md: rem(14),
    lg: rem(16),
    xl: rem(20),
  },
});

export const COLOR_SCHEME_LS_KEY = `${LS_KEY_PREFIX}-color-scheme`;

export const colorSchemeManager = localStorageColorSchemeManager({
  key: COLOR_SCHEME_LS_KEY,
});
