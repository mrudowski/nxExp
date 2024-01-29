import {MantineProvider} from '@mantine/core';
import {render, screen, within} from '@testing-library/react';
import {userEvent} from '@testing-library/user-event';

import App from './App.tsx';

describe('App', () => {
  it('should render successfully', async () => {
    render(
      <MantineProvider>
        <App />
      </MantineProvider>
    );

    expect(screen.getByText('Grass')).toBeInTheDocument();
    expect(screen.getByLabelText('sprite-Grass')).toBeInTheDocument();
    expect(screen.getByLabelText('slot-0,0')).toBeInTheDocument();
  });
});

describe('App', () => {
  it('should paint into empty slot-0,0 Grass and then Sand tile', async () => {
    render(
      <MantineProvider>
        <App />
      </MantineProvider>
    );
    const user = userEvent.setup();
    const slot = screen.getByLabelText('slot-0,0');
    const paletteTileGrass = screen.getByLabelText('sprite-Grass');
    const paletteTileSand = screen.getByLabelText('sprite-Sand');
    expect(within(slot).queryByLabelText('sprite-', {exact: false})).not.toBeInTheDocument();

    await user.click(within(slot).getByRole('button'));
    // const t1 = await within(slot).findByLabelText('sprite-Grass', {exact: true});
    // screen.debug(slot);
    // expect(t1).toBeInTheDocument();
    expect(within(slot).getByLabelText('sprite-Grass')).toBeInTheDocument();

    await user.click(paletteTileGrass);
    await user.click(paletteTileSand);
    await user.click(within(slot).getByRole('button'));
    expect(within(slot).getByLabelText('sprite-Sand')).toBeInTheDocument();
  });
});
