import {render, screen} from '@testing-library/react';
import {describe, it} from 'vitest';

import Avatar from '@/components/Avatar/Avatar.tsx';

describe('Avatar', () => {
  it('render first letter of name', async () => {
    render(<Avatar name={'Luke'} />);
    const firstLetter = screen.getByText('L', {exact: true});
    expect(firstLetter).toBeInTheDocument();
  });
});
