import {queryClient} from '@nx-exp/sw-base-tools';
import {QueryClientProvider} from '@tanstack/react-query';
import {render, screen} from '@testing-library/react';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {MemoryRouter} from 'react-router-dom';
import {describe, it} from 'vitest';

import {defaultNS, resources} from '@/i18n/i18n.ts';

import Characters from './Characters.tsx';

describe('Characters', () => {
  it('render characters page', async () => {
    i18n.use(initReactI18next).init({
      lng: 'en',
      defaultNS,
      resources,
    });
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Characters />
        </MemoryRouter>
      </QueryClientProvider>
    );
    const loading = screen.getByText('Loading…', {exact: true});
    expect(loading).toBeInTheDocument();

    const lukeSkywalker = await screen.findByText('Luke Skywalker', {exact: true});
    const c3PO = await screen.findByText('C-3PO', {exact: true});
    const pageTitle = screen.getByRole('heading', {level: 2});

    expect(lukeSkywalker).toBeInTheDocument();
    expect(c3PO).toBeInTheDocument();
    expect(pageTitle).toHaveTextContent('Characters (2)');
    // screen.debug();
  });
});
