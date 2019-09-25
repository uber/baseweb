/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {render, fireEvent} from '@testing-library/react';

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

  it('applies filter with expected selection', () => {
    const column = BooleanColumn({title: 'column'});
    const Filter = column.renderFilter;

    const mockSetFilter = jest.fn();
    const data = [true, false, true];
    const {container, getByText} = render(
      <Filter setFilter={mockSetFilter} close={() => {}} data={data} />,
    );

    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    fireEvent.click(checkboxes[0]);
    expect(((checkboxes[0]: any): HTMLInputElement).checked).toBe(true);

    fireEvent.click(getByText('Apply'));

    expect(mockSetFilter.mock.calls.length).toBe(1);
    const [filterParams, description] = mockSetFilter.mock.calls[0];
    expect(filterParams.selection.has(true)).toBe(true);
    expect(filterParams.selection.has(false)).toBe(false);
    expect(filterParams.exclude).toBe(false);
    expect(description).toBe('true');
  });

  it('builds expected filter function', () => {
    const column = BooleanColumn({title: 'column'});
    const simple = column.buildFilter({
      selection: new Set([true]),
      exclude: false,
    });
    expect(simple(true)).toBe(true);
    expect(simple(false)).toBe(false);

    const exclude = column.buildFilter({
      selection: new Set([true]),
      exclude: true,
    });
    expect(exclude(true)).toBe(false);
    expect(exclude(false)).toBe(true);
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
