/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { render } from '@testing-library/react';

import { HighlightCellText } from '../text-search';

describe('HighlightCellText', () => {
  it('renders the text value when there is no active query', () => {
    const { container } = render(<HighlightCellText text="hello world" query="" />);
    expect(container.textContent).toBe('hello world');
  });

  it('renders the text value with the matching segment highlighted', () => {
    const { container } = render(<HighlightCellText text="hello world" query="world" />);
    expect(container.textContent).toBe('hello world');
  });
});
