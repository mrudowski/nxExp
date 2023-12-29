import {createTheme, localStorageColorSchemeManager} from '@mantine/core';

import {LS_KEY_PREFIX} from '../../constants.ts';

export const theme = createTheme({
  fontFamily: 'Lato, sans-serif',
  primaryColor: 'cyan',
  cursorType: 'pointer',
});

export const COLOR_SCHEME_LS_KEY = `${LS_KEY_PREFIX}-color-scheme`;

export const colorSchemeManager = localStorageColorSchemeManager({
  key: COLOR_SCHEME_LS_KEY,
});
