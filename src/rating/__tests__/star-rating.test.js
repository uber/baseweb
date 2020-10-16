/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import * as React from 'react';
import {
  render,
  fireEvent,
  getByRole,
  getAllByRole,
} from '@testing-library/react';

import {StarRating} from '../index.js';

describe('StarRating', () => {
  it('applies correct accessibility attributes to the root element', () => {
    const {container} = render(<StarRating value={2} />);
    getByRole(container, 'radiogroup');
  });

  it('sets correct accessibility attributes to radio elements', () => {
    const {container} = render(<StarRating value={2} />);
    const items = getAllByRole(container, 'radio');
    expect(items[0].getAttribute('aria-checked')).toBe('true');
    expect(items[1].getAttribute('aria-checked')).toBe('true');
    expect(items[2].getAttribute('aria-checked')).toBe('false');
    expect(items[3].getAttribute('aria-checked')).toBe('false');
    expect(items[4].getAttribute('aria-checked')).toBe('false');
  });

  it('can update active radio on click', () => {
    function TestCase() {
      const [value, setValue] = React.useState(-1);
      return (
        <StarRating value={value} onChange={({value}) => setValue(value)} />
      );
    }
    const {container} = render(<TestCase />);
    const items = getAllByRole(container, 'radio');
    for (let item of items) {
      expect(item.getAttribute('aria-checked')).toBe('false');
    }
    fireEvent.click(items[1]);
    expect(items[0].getAttribute('aria-checked')).toBe('true');
    expect(items[1].getAttribute('aria-checked')).toBe('true');
    expect(items[2].getAttribute('aria-checked')).toBe('false');
    expect(items[3].getAttribute('aria-checked')).toBe('false');
    expect(items[4].getAttribute('aria-checked')).toBe('false');
  });
});
