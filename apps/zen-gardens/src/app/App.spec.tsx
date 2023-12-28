import {MantineProvider} from '@mantine/core';
import {render, screen} from '@testing-library/react';

import App from './App.tsx';

describe('App', () => {
  it('should render successfully', () => {
    render(
      <MantineProvider>
        <App />
      </MantineProvider>
    );
    expect(screen.getByText('[3,3]')).toBeInTheDocument();
  });
});
