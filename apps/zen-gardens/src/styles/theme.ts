import {createTheme, localStorageColorSchemeManager} from '@mantine/core';

export const theme = createTheme({
  fontFamily: 'Lato, sans-serif',
  primaryColor: 'cyan',
  cursorType: 'pointer',
});

export const COLOR_SCHEME_LOCAL_STORAGE_KEY = 'zen-gardens-color-scheme';

export const colorSchemeManager = localStorageColorSchemeManager({
  key: COLOR_SCHEME_LOCAL_STORAGE_KEY,
});
