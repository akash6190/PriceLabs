import React from 'react';
import { render } from '@testing-library/react';

import RoundButton from './round-button';

describe('RoundButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RoundButton />);
    expect(baseElement).toBeTruthy();
  });
});
