/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { render, getByRole, getByText } from '@testing-library/react';
import '@testing-library/jest-dom';

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

  it('should render component and set a correct aria-valuenow value (rounded and formatted)', async () => {
    const { container } = render(<ProgressBarRounded progress={0.5} size={SIZE.medium} />);
    const progressBar = getByRole(container, 'progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '0.5');
  });
});
