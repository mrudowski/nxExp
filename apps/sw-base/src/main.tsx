import './styles/index.scss';
import './i18n/i18n';

import {QueryClientProvider} from '@tanstack/react-query';
import {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider} from 'react-router-dom';

import getRouter from './router/router';
import queryClient from './services/queryClient';

const router = getRouter(queryClient);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);