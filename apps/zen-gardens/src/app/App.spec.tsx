import {screen, within} from '@testing-library/react';
import {userEvent} from '@testing-library/user-event';

import {renderWithAppWrapper} from '@/test/test-utils.tsx';

import App from './App.tsx';

const renderApp = () => {
  renderWithAppWrapper(<App />);
  // render(<App />, {wrapper: AppWrapper});
};

describe('App', () => {
  it('should render successfully', async () => {
    renderApp();

    expect(screen.getByText('Grass')).toBeInTheDocument();
    expect(screen.getByLabelText('sprite-Grass')).toBeInTheDocument();
    expect(screen.getByLabelText('slot-0,0')).toBeInTheDocument();
  });

  it('should paint into empty slot-0,0 Grass and then Sand tile', async () => {
    renderApp();

    const user = userEvent.setup();
    const slot = screen.getByLabelText('slot-0,0');
    const paletteTileSand = screen.getByLabelText('sprite-Sand');
    expect(within(slot).queryByLabelText('sprite-', {exact: false})).not.toBeInTheDocument();

    await user.click(within(slot).getByRole('button'));
    // const t1 = await within(slot).findByLabelText('sprite-Grass', {exact: true});
    // screen.debug(slot);
    // expect(t1).toBeInTheDocument();
    expect(within(slot).getByLabelText('sprite-Grass')).toBeInTheDocument();

    await user.click(paletteTileSand);
    await user.click(within(slot).getByRole('button'));
    expect(within(slot).getByLabelText('sprite-Sand')).toBeInTheDocument();
  });

  it('should be able to undo and redo once', async () => {
    renderApp();

    const user = userEvent.setup();
    const slot = screen.getByLabelText('slot-0,0');
    const undo = screen.getByLabelText('Undo');
    const redo = screen.getByLabelText('Redo');

    expect(within(slot).queryByLabelText('sprite-', {exact: false})).not.toBeInTheDocument();
    expect(undo).toBeDisabled();
    expect(redo).toBeDisabled();

    await user.click(within(slot).getByRole('button'));
    expect(within(slot).getByLabelText('sprite-Grass')).toBeInTheDocument();
    expect(undo).toBeEnabled();
    expect(redo).toBeDisabled();

    await user.click(undo);
    expect(within(slot).queryByLabelText('sprite-', {exact: false})).not.toBeInTheDocument();
    expect(undo).toBeDisabled();
    expect(redo).toBeEnabled();

    await user.click(redo);
    expect(within(slot).getByLabelText('sprite-Grass')).toBeInTheDocument();
    expect(undo).toBeEnabled();
    expect(redo).toBeDisabled();
  });
});
