/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { render, getByRole, getByText } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { ProgressBarRounded, SIZE } from '..';

describe('Rounded progress bar', function () {
  it('should render component', () => {
    const { container } = render(<ProgressBarRounded progress={0.5} size={SIZE.medium} />);
    getByRole(container, 'progressbar');
  });

  it('should render component and displays the progress', async () => {
    const { container } = render(<ProgressBarRounded progress={0.5} size={SIZE.medium} />);
    getByText(container, '50%');
  });

  it('should render component and set a correct aria-valuenow value (numeric)', async () => {
    const { container } = render(<ProgressBarRounded progress={0.5} size={SIZE.medium} />);
    const progressBar = getByRole(container, 'progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '0.5');
  });

  it('should have aria-live attribute for accessibility', () => {
    const { container } = render(<ProgressBarRounded progress={0.5} />);
    const progressBar = getByRole(container, 'progressbar');
    expect(progressBar).toHaveAttribute('aria-live', 'polite');
  });

  it('should have default aria-label with percentage', () => {
    const { container } = render(<ProgressBarRounded progress={0.75} />);
    const progressBar = getByRole(container, 'progressbar', { name: '75% complete' });
    expect(progressBar).toBeInTheDocument();
  });

  it('should accept custom aria-label prop', () => {
    const { container } = render(<ProgressBarRounded progress={0.5} ariaLabel="Uploading file" />);
    const progressBar = getByRole(container, 'progressbar', { name: 'Uploading file' });
    expect(progressBar).toBeInTheDocument();
  });

  it('should accept custom aria-label via kebab-case prop', () => {
    const { container } = render(
      <ProgressBarRounded progress={0.5} aria-label="Processing data" />
    );
    const progressBar = getByRole(container, 'progressbar', { name: 'Processing data' });
    expect(progressBar).toBeInTheDocument();
  });
});
