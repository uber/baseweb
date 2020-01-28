/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {render} from '@testing-library/react';

import {StringColumn} from '../index.js';

describe('string column', () => {
  it('is sortable by default', () => {
    const column = StringColumn({title: 'column', mapDataToValue: () => ''});
    expect(column.sortable).toBe(true);
  });

  it('is not filterable by default', () => {
    const column = StringColumn({title: 'column', mapDataToValue: () => ''});
    expect(column.filterable).toBe(false);
  });

  it('applies provided sortable value', () => {
    const column = StringColumn({
      title: 'column',
      sortable: false,
      mapDataToValue: () => '',
    });
    expect(column.sortable).toBe(false);
  });

  it('cell renders provided value', () => {
    const column = StringColumn({title: 'column', mapDataToValue: () => ''});
    const Cell = column.renderCell;

    const {container} = render(<Cell value="hello" />);
    const cell = container.querySelector('div');
    expect(cell.textContent).toBe('hello');
  });

  it('builds expected sort function', () => {
    const column = StringColumn({title: 'column', mapDataToValue: () => ''});
    const input = ['A', 'B', 'C', 'C', 'B', 'A'];
    input.sort(column.sortFn);

    const output = ['A', 'A', 'B', 'B', 'C', 'C'];
    for (let i = 0; i < input.length; i++) {
      expect(input[i]).toBe(output[i]);
    }
  });
});
