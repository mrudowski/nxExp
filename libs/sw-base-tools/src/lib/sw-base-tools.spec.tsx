import {render} from '@testing-library/react';

import SwBaseTools from './sw-base-tools';

describe('SwBaseTools', () => {
  it('should render successfully', () => {
    const {baseElement} = render(<SwBaseTools />);
    expect(baseElement).toBeTruthy();
  });
});
