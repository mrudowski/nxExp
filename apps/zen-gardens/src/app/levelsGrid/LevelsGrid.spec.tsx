import {screen, within} from '@testing-library/react';
import {expect} from 'vitest';

import {renderWithAppWrapper} from '@/test/test-utils.tsx';

import LevelsGrid from './components/LevelsGrid/LevelsGrid.tsx';

/**
 * roles based on https://react-spectrum.adobe.com/react-aria/GridList.html
 */

describe('LevelsGrid', () => {
  it('should have a list of levels', async () => {
    renderWithAppWrapper(<LevelsGrid />);
    const levelsGrid = screen.getByRole('grid', {name: 'LevelsGrid'});
    const level = within(levelsGrid).getByRole('row', {name: 'Layer 1'});
    expect(level).toBeInTheDocument();
  });
});
