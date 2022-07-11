/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { NumericalColumn, NUMERICAL_FORMATS } from '../index';

describe('numerical column', () => {
  it('is sortable by default', () => {
    const column = NumericalColumn({ title: 'column', mapDataToValue: () => 0 });
    expect(column.sortable).toBe(true);
  });

  it('is filterable by default', () => {
    const column = NumericalColumn({ title: 'column', mapDataToValue: () => 0 });
    expect(column.filterable).toBe(true);
  });

  it('applies provided sortable value', () => {
    const column = NumericalColumn({
      title: 'column',
      sortable: false,
      mapDataToValue: () => 0,
    });
    expect(column.sortable).toBe(false);
  });

  it('applies provided filterable value', () => {
    const column = NumericalColumn({
      title: 'column',
      filterable: false,
      mapDataToValue: () => 0,
    });
    expect(column.filterable).toBe(false);
  });

  it('cell renders provided value with default options', () => {
    const column = NumericalColumn({ title: 'column', mapDataToValue: () => 0 });
    const Cell = column.renderCell;

    const { container } = render(<Cell value={1999.888} x={0} y={0} />);
    const cell = container.querySelector('div');
    expect(cell?.textContent).toBe('2000');
  });

  it('cell renders positive value according to accounting format', () => {
    const value = 1999.888;
    const column = NumericalColumn({
      title: 'column',
      format: NUMERICAL_FORMATS.ACCOUNTING,
      mapDataToValue: () => value,
    });
    const Cell = column.renderCell;

    const { container } = render(<Cell value={value} x={0} y={0} />);
    const cell = container.querySelector('div');
    expect(cell?.textContent).toBe('$1999.89');
  });

  it('cell renders negative value according to accounting format', () => {
    const value = -1999.888;
    const column = NumericalColumn({
      title: 'column',
      format: NUMERICAL_FORMATS.ACCOUNTING,
      mapDataToValue: () => value,
    });
    const Cell = column.renderCell;

    const { container } = render(<Cell value={value} x={0} y={0} />);
    const cell = container.querySelector('div');
    expect(cell?.textContent).toBe('($1999.89)');
  });

  it('cell renders value according to percentage format', () => {
    const value = 1999.888;
    const column = NumericalColumn({
      title: 'column',
      format: NUMERICAL_FORMATS.PERCENTAGE,
      mapDataToValue: () => value,
    });
    const Cell = column.renderCell;

    const { container } = render(<Cell value={value} x={0} y={0} />);
    const cell = container.querySelector('div');
    expect(cell?.textContent).toBe('1999.89%');
  });

  it('cell renders value formatted by passed format function', () => {
    const value = 1999.888;
    const column = NumericalColumn({
      title: 'column',
      format: (value) => `EUR ${value}`,
      mapDataToValue: () => value,
    });
    const Cell = column.renderCell;

    const { container } = render(<Cell value={value} x={0} y={0} />);
    const cell = container.querySelector('div');
    expect(cell?.textContent).toBe('EUR 1999.888');
  });

  it('cell renders value according to provided precision', () => {
    const value = 1999.888;
    const column = NumericalColumn({
      title: 'column',
      precision: 3,
      mapDataToValue: () => value,
    });
    const Cell = column.renderCell;

    const { container } = render(<Cell value={value} x={0} y={0} />);
    const cell = container.querySelector('div');
    expect(cell?.textContent).toBe('1999.888');
  });

  it('can call setFilter with expected selection', () => {
    const column = NumericalColumn({ title: 'column', mapDataToValue: () => 0 });
    const Filter = column.renderFilter;

    const mockSetFilter = jest.fn();
    const data = [1, 2, 3, 4];
    const { container, getByText } = render(
      <Filter setFilter={mockSetFilter} close={() => {}} data={data} />
    );

    const inputs = container.querySelectorAll('div[data-baseweb="input"] input');
    expect(inputs.length).toBe(2);
    fireEvent.change(inputs[1], { target: { value: '2' } });
    fireEvent.click(getByText('Apply'));

    expect(mockSetFilter.mock.calls.length).toBe(1);
    const [filterParams] = mockSetFilter.mock.calls[0];
    expect(filterParams.exclude).toBe(false);
    expect(filterParams.description).toBe('≥ 1 and ≤ 2');
  });

  it('can exclude the range', () => {
    const column = NumericalColumn({ title: 'column', mapDataToValue: () => 0 });
    const Filter = column.renderFilter;

    const mockSetFilter = jest.fn();
    const data = [1, 2, 3, 4];
    const { getByText } = render(<Filter setFilter={mockSetFilter} close={() => {}} data={data} />);

    fireEvent.click(getByText('Exclude range'));
    fireEvent.click(getByText('Apply'));

    expect(mockSetFilter.mock.calls.length).toBe(1);
    const [filterParams] = mockSetFilter.mock.calls[0];
    expect(filterParams.exclude).toBe(true);
    expect(filterParams.description).toBe('≥ 1 and ≤ 4');

    fireEvent.click(getByText('Single Value'));
    fireEvent.click(getByText('Exclude value'));
    fireEvent.click(getByText('Apply'));

    const [filterParamsSecond] = mockSetFilter.mock.calls[1];
    expect(filterParamsSecond.exclude).toBe(false);
    expect(filterParamsSecond.description).toBe('= 3');
  });

  it('builds default filter function for integers', () => {
    const column = NumericalColumn({ title: 'column', mapDataToValue: () => 0 });
    const eq = column.buildFilter({
      lowerValue: 1,
      upperValue: 2,
      description: '',
      exclude: false,
      excludeKind: 'range',
    });
    expect(eq(3)).toBe(false);
    expect(eq(2)).toBe(true);
    expect(eq(1)).toBe(true);
    expect(eq(0)).toBe(false);

    const eqE = column.buildFilter({
      lowerValue: 1,
      upperValue: 2,
      description: '',
      exclude: true,
      excludeKind: 'range',
    });

    expect(eqE(3)).toBe(true);
    expect(eqE(2)).toBe(false);
    expect(eqE(1)).toBe(false);
    expect(eqE(0)).toBe(true);
  });

  // it rounds based on the default precision, which is 0, so to closest whole number.
  it('builds default filter function for floats', () => {
    const column = NumericalColumn({ title: 'column', mapDataToValue: () => 0 });
    const eq = column.buildFilter({
      lowerValue: 1.1,
      upperValue: 2.2,
      description: '',
      exclude: false,
      excludeKind: 'range',
    });
    expect(eq(1)).toBe(false);
    expect(eq(1.1)).toBe(false);
    expect(eq(2)).toBe(true);
    expect(eq(2.2)).toBe(true);
    expect(eq(2.6)).toBe(false);

    const eqE = column.buildFilter({
      lowerValue: 1.1,
      upperValue: 2.2,
      description: '',
      exclude: true,
      excludeKind: 'range',
    });
    expect(eqE(1)).toBe(true);
    expect(eqE(1.1)).toBe(true);
    expect(eqE(2)).toBe(false);
    expect(eqE(2.2)).toBe(false);
    expect(eqE(3.6)).toBe(true);
  });

  // it rounds based on the accounting precision, 2 digits
  it('builds accounting filter function for floats, 2 digits', () => {
    const column = NumericalColumn({
      title: 'column',
      format: NUMERICAL_FORMATS.ACCOUNTING,
      mapDataToValue: () => 0,
    });
    const eq = column.buildFilter({
      lowerValue: 2.95,
      upperValue: 2.95,
      description: '',
      exclude: false,
      excludeKind: 'value',
    });
    expect(eq(3)).toBe(false);
    expect(eq(2.95)).toBe(true);
    expect(eq(2)).toBe(false);
  });

  // it rounds based on the provided precision
  it('builds accounting filter function for floats', () => {
    const column = NumericalColumn({
      title: 'column',
      precision: 3,
      mapDataToValue: () => 0,
    });
    const eq = column.buildFilter({
      lowerValue: 2.954,
      upperValue: 2.954,
      description: '',
      exclude: false,
      excludeKind: 'value',
    });
    expect(eq(3)).toBe(false);
    expect(eq(2.954)).toBe(true);
    expect(eq(2.95)).toBe(false);
    expect(eq(2)).toBe(false);
  });

  it('builds expected sort function', () => {
    const column = NumericalColumn({ title: 'column', mapDataToValue: () => 0 });
    const input = [2, 1, 3, 4];
    input.sort(column.sortFn);

    const output = [1, 2, 3, 4];
    for (let i = 0; i < input.length; i++) {
      expect(input[i]).toBe(output[i]);
    }
  });
});
