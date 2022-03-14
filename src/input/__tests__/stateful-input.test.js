/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {render, fireEvent} from '@testing-library/react';
import {StatefulInput} from '../index.js';

describe('stateful-input', () => {
  it('renders input', () => {
    const {container} = render(<StatefulInput />);
    const input = container.querySelector('input');
    expect(input).not.toBeNull();
  });

  it('handles change events', () => {
    const {container} = render(<StatefulInput />);
    const input = container.querySelector('input');
    expect(input?.value).toBe('');

    if (input) fireEvent.change(input, {target: {value: 'a'}});
    expect(input?.value).toBe('a');
  });
});
