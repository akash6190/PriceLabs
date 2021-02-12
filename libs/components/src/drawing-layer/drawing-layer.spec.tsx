import React from 'react';
import { render } from '@testing-library/react';

import DrawingLayer from './drawing-layer';

describe('DrawingLayer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DrawingLayer />);
    expect(baseElement).toBeTruthy();
  });
});
