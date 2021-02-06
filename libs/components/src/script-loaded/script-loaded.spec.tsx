import React from 'react';
import { render } from '@testing-library/react';

import ScriptLoaded from './script-loaded';

describe('ScriptLoaded', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ScriptLoaded />);
    expect(baseElement).toBeTruthy();
  });
});
