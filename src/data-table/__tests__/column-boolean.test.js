/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {render} from '@testing-library/react';

import {BooleanColumn} from '../index.js';

describe('boolean column', () => {
  it('is sortable by default', () => {
    const column = BooleanColumn({title: 'column'});
    expect(column.sortable).toBe(true);
  });

  it('is filterable by default', () => {
    const column = BooleanColumn({title: 'column'});
    expect(column.filterable).toBe(true);
  });

  it('applies provided sortable value', () => {
    const column = BooleanColumn({title: 'column', sortable: false});
    expect(column.sortable).toBe(false);
  });

  it('applies provided filterable value', () => {
    const column = BooleanColumn({title: 'column', filterable: false});
    expect(column.filterable).toBe(false);
  });

  it('cell renders T if true value provided', () => {
    const column = BooleanColumn({title: 'column'});
    const Cell = column.renderCell;

    const {container} = render(<Cell value={true} />);
    const cell = container.querySelector('div');
    expect(cell.textContent).toBe('T');
  });

  it('cell renders F if false value provided', () => {
    const column = BooleanColumn({title: 'column'});
    const Cell = column.renderCell;

    const {container} = render(<Cell value={false} />);
    const cell = container.querySelector('div');
    expect(cell.textContent).toBe('F');
  });

  xit('renders expected filter component', () => {
    // boolean filter component is not implemented yet
  });

  xit('builds expected filter function', () => {
    // boolean filter params are not implemented yet
  });

  it('builds expected sort function', () => {
    const column = BooleanColumn({title: 'column'});
    const input = [true, false, true, false, false, true, true, false];
    input.sort(column.sortFn);

    const output = [true, true, true, true, false, false, false, false];
    for (let i = 0; i < input.length; i++) {
      expect(input[i]).toBe(output[i]);
    }
  });
});
