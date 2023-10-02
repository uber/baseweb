/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { SegmentedControl, Segment } from '../';

describe('SegmentedControl', () => {
  test('Should render all the segments', () => {
    render(
      <SegmentedControl>
        <Segment label="first" />
        <Segment label="second" />
        <Segment label="third" />
      </SegmentedControl>
    );
    expect(screen.getByText('first')).toBeDefined();
    expect(screen.getByText('second')).toBeDefined();
    expect(screen.getByText('third')).toBeDefined();
  });
  test('Should onChange to get fired on clicking a segment', () => {
    const mockOnChange = jest.fn();
    render(
      <SegmentedControl onChange={mockOnChange}>
        <Segment label="first" />
        <Segment label="second" />
        <Segment label="third" />
      </SegmentedControl>
    );
    const second = screen.getByText('second');
    fireEvent.click(second);
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });
  test('Should contain the badge', () => {
    render(
      <SegmentedControl>
        <Segment label="label" badge="badge" />
      </SegmentedControl>
    );
    expect(screen.getByText('badge')).toBeDefined();
  });
});
