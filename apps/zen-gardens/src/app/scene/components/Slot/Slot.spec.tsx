import {render, screen, within} from '@testing-library/react';
import {userEvent} from '@testing-library/user-event';

import {atlas} from '@/data/atlas.ts';
import {getAtlas} from '@/data/getAtlas.ts';

import Slot from './Slot.tsx';

describe('Slot', () => {
  it('can render with null tile', async () => {
    render(<Slot id="0,0" x={0} y={0} tileScale={1} tile={null} onInteraction={vi.fn()} />);

    const slot = screen.getByLabelText('slot-0,0');
    expect(within(slot).queryByLabelText('sprite-', {exact: false})).not.toBeInTheDocument();
  });

  it('can render with Grass tile', async () => {
    render(
      <Slot
        id="0,0"
        x={0}
        y={0}
        tileScale={1}
        tile={getAtlas(atlas)[0].tilesGroups[0].tiles[0]}
        onInteraction={vi.fn()}
      />
    );

    expect(screen.getByLabelText('sprite-Grass')).toBeInTheDocument();
  });

  it('is interactive', async () => {
    const handleInteraction = vi.fn();
    render(<Slot id="0,0" x={0} y={0} tileScale={1} tile={null} onInteraction={handleInteraction} />);

    const user = userEvent.setup();
    const slot = screen.getByLabelText('slot-0,0');

    expect(within(slot).getByRole('button')).toBeInTheDocument();

    await user.click(within(slot).getByRole('button'));
    expect(handleInteraction).toHaveBeenCalledTimes(2);
    expect(handleInteraction).toHaveBeenLastCalledWith('0,0', true);
  });
});
