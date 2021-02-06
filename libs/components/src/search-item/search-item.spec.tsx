import React from 'react';
import { render } from '@testing-library/react';

import SearchItem from './search-item';

describe('SearchItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SearchItem />);
    expect(baseElement).toBeTruthy();
  });
});
