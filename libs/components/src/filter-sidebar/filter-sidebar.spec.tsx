import React from 'react';
import { render } from '@testing-library/react';

import FilterSidebar from './filter-sidebar';

describe('FilterSidebar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FilterSidebar />);
    expect(baseElement).toBeTruthy();
  });
});
