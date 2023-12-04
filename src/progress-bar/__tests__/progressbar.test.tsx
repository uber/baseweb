/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { render, getByRole, getByText } from '@testing-library/react';

import { ProgressBar } from '..';

describe('Stateless progress bar', function () {
  it('should render component', () => {
    const { container } = render(<ProgressBar value={75} />);
    getByRole(container, 'progressbar');
  });

  it('should render label', () => {
    const label = 'label';
    const { container } = render(
      <ProgressBar value={75} getProgressLabel={() => label} showLabel />
    );
    getByText(container, label);
  });

  it('should have step aria-label', () => {
    const { container } = render(<ProgressBar value={75} steps={4} />);
    getByRole(container, 'progressbar', { name: 'Step 3 of 4' });
  });

  it('should have loading aria-label if indeterminate', () => {
    const { container } = render(<ProgressBar infinite steps={3} />);
    getByRole(container, 'progressbar', { name: 'Loading' });
  });

  it('should have passed in aria-label', () => {
    const { container } = render(<ProgressBar aria-label="test" steps={2} />);
    getByRole(container, 'progressbar', { name: 'test' });
  });
});
