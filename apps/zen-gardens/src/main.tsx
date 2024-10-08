import '@mantine/core/styles.css';
import 'mantine-contextmenu/styles.css';
import './styles/index.scss';

import {ColorSchemeScript, MantineProvider} from '@mantine/core';
import {ContextMenuProvider} from 'mantine-contextmenu';
import {StrictMode} from 'react';
import * as ReactDOM from 'react-dom/client';

import {COLOR_SCHEME_LS_KEY, colorSchemeManager, theme} from '@/styles/theme.ts';

import App from './app/App.tsx';

// ColorSchemeScript not needed here or not working in dev mode - it's to slow

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <ColorSchemeScript defaultColorScheme="auto" localStorageKey={COLOR_SCHEME_LS_KEY} />
    <MantineProvider theme={theme} defaultColorScheme="auto" colorSchemeManager={colorSchemeManager}>
      <ContextMenuProvider>
        <App />
      </ContextMenuProvider>
    </MantineProvider>
  </StrictMode>,
);
