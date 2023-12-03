import './styles/index.scss';
import './i18n/i18n';

import {queryClient} from '@nx-exp/sw-base-tools';
import {QueryClientProvider} from '@tanstack/react-query';
import {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider} from 'react-router-dom';
import {IntlProvider} from 'use-intl';

import getRouter from '@/router/router';
import {ThemeProvider} from '@/theme';

const router = getRouter(queryClient);

// only for quick test shared component in both environments
const messages = {
  errors: {
    problemWhileFetching: 'Problem while fetching',
  },
  utils: {
    loading: 'Loading…',
  },
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <IntlProvider messages={messages} locale="en">
          <RouterProvider router={router} />
        </IntlProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
