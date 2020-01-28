/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {render, fireEvent} from '@testing-library/react';

import {NumericalColumn, NUMERICAL_FORMATS} from '../index.js';

describe('numerical column', () => {
  it('is sortable by default', () => {
    const column = NumericalColumn({title: 'column', mapDataToValue: () => 0});
    expect(column.sortable).toBe(true);
  });

  it('is filterable by default', () => {
    const column = NumericalColumn({title: 'column', mapDataToValue: () => 0});
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
    const column = NumericalColumn({title: 'column', mapDataToValue: () => 0});
    const Cell = column.renderCell;

    const {container} = render(<Cell value={1999.888} />);
    const cell = container.querySelector('div');
    expect(cell.textContent).toBe('2000');
  });

  it('cell renders positive value according to accounting format', () => {
    const value = 1999.888;
    const column = NumericalColumn({
      title: 'column',
      format: NUMERICAL_FORMATS.ACCOUNTING,
      mapDataToValue: () => value,
    });
    const Cell = column.renderCell;

    const {container} = render(<Cell value={value} />);
    const cell = container.querySelector('div');
    expect(cell.textContent).toBe('$1999.89');
  });

  it('cell renders negative value according to accounting format', () => {
    const value = -1999.888;
    const column = NumericalColumn({
      title: 'column',
      format: NUMERICAL_FORMATS.ACCOUNTING,
      mapDataToValue: () => value,
    });
    const Cell = column.renderCell;

    const {container} = render(<Cell value={value} />);
    const cell = container.querySelector('div');
    expect(cell.textContent).toBe('($1999.89)');
  });

  it('cell renders value according to percentage format', () => {
    const value = 1999.888;
    const column = NumericalColumn({
      title: 'column',
      format: NUMERICAL_FORMATS.PERCENTAGE,
      mapDataToValue: () => value,
    });
    const Cell = column.renderCell;

    const {container} = render(<Cell value={value} />);
    const cell = container.querySelector('div');
    expect(cell.textContent).toBe('1999.89%');
  });

  it('cell renders value according to provided precision', () => {
    const value = 1999.888;
    const column = NumericalColumn({
      title: 'column',
      precision: 3,
      mapDataToValue: () => value,
    });
    const Cell = column.renderCell;

    const {container} = render(<Cell value={value} />);
    const cell = container.querySelector('div');
    expect(cell.textContent).toBe('1999.888');
  });

  it('can call setFilter with expected selection', () => {
    const column = NumericalColumn({title: 'column', mapDataToValue: () => 0});
    const Filter = column.renderFilter;

    const mockSetFilter = jest.fn();
    const data = [1, 2, 3, 4];
    const {container, getByText} = render(
      <Filter setFilter={mockSetFilter} close={() => {}} data={data} />,
    );

    const inputs = container.querySelectorAll(
      'div[data-baseweb="input"] input',
    );
    fireEvent.change(inputs[1], {target: {value: '2'}});
    fireEvent.click(getByText('Apply'));

    expect(mockSetFilter.mock.calls.length).toBe(1);
    const [filterParams] = mockSetFilter.mock.calls[0];
    expect(filterParams.comparisons[0].value).toBe(2);
    expect(filterParams.exclude).toBe(false);
    expect(filterParams.comparisons[0].operation).toBe('LT');
    expect(filterParams.description).toBe('LT 2');
  });

  it('hides operators if filter single value', () => {
    const column = NumericalColumn({title: 'column', mapDataToValue: () => 0});
    const Filter = column.renderFilter;

    const mockSetFilter = jest.fn();
    const data = [1, 2, 3, 4];
    const {container, getByText} = render(
      <Filter setFilter={mockSetFilter} close={() => {}} data={data} />,
    );

    const before = container.querySelectorAll(
      'div[data-baseweb="button-group"]',
    );
    expect(before.length).toBe(2);

    fireEvent.click(getByText('Single Value'));

    const after = container.querySelectorAll(
      'div[data-baseweb="button-group"]',
    );
    expect(after.length).toBe(1);
  });

  it('builds default filter function for integers', () => {
    const column = NumericalColumn({title: 'column', mapDataToValue: () => 0});
    const eq = column.buildFilter({
      comparisons: [
        {
          value: 2,
          operation: 'EQ',
        },
      ],
      description: '',
      exclude: false,
    });
    expect(eq(2)).toBe(true);
    expect(eq(-2)).toBe(false);

    const lt = column.buildFilter({
      comparisons: [
        {
          value: 2,
          operation: 'LT',
        },
      ],
      description: '',
      exclude: false,
    });
    expect(lt(1)).toBe(true);
    expect(lt(2)).toBe(false);

    const lte = column.buildFilter({
      comparisons: [
        {
          value: 2,
          operation: 'LTE',
        },
      ],
      description: '',
      exclude: false,
    });
    expect(lte(1)).toBe(true);
    expect(lte(2)).toBe(true);
    expect(lte(3)).toBe(false);

    const gt = column.buildFilter({
      comparisons: [
        {
          value: 2,
          operation: 'GT',
        },
      ],
      description: '',
      exclude: false,
    });
    expect(gt(3)).toBe(true);
    expect(lt(2)).toBe(false);

    const gte = column.buildFilter({
      comparisons: [
        {
          value: 2,
          operation: 'GTE',
        },
      ],
      description: '',
      exclude: false,
    });
    expect(gte(3)).toBe(true);
    expect(gte(2)).toBe(true);
    expect(gte(1)).toBe(false);
  });

  // it rounds based on the default precision, which is 0, so to closest whole number.
  it('builds default filter function for floats', () => {
    const column = NumericalColumn({title: 'column', mapDataToValue: () => 0});
    const eq = column.buildFilter({
      comparisons: [
        {
          value: 2.95,
          operation: 'EQ',
        },
      ],
      description: '',
      exclude: false,
    });
    expect(eq(3)).toBe(true);
    expect(eq(2.95)).toBe(true);
    expect(eq(2)).toBe(false);

    const lt = column.buildFilter({
      comparisons: [
        {
          value: 2.95,
          operation: 'LT',
        },
      ],
      description: '',
      exclude: false,
    });
    expect(lt(1)).toBe(true);
    expect(lt(2)).toBe(true);
    expect(lt(2.94)).toBe(false);
    expect(lt(2.95)).toBe(false);
    expect(lt(3)).toBe(false);

    const lte = column.buildFilter({
      comparisons: [
        {
          value: 2.95,
          operation: 'LTE',
        },
      ],
      description: '',
      exclude: false,
    });
    expect(lte(2)).toBe(true);
    expect(lte(2.94)).toBe(true);
    expect(lte(2.95)).toBe(true);
    expect(lte(2.96)).toBe(true);
    expect(lte(3)).toBe(true);
    expect(lte(4)).toBe(false);

    const gt = column.buildFilter({
      comparisons: [
        {
          value: 2.95,
          operation: 'GT',
        },
      ],
      description: '',
      exclude: false,
    });
    expect(gt(4)).toBe(true);
    expect(gt(3)).toBe(false);
    expect(lt(2.96)).toBe(false);

    const gte = column.buildFilter({
      comparisons: [
        {
          value: 2.95,
          operation: 'GTE',
        },
      ],
      description: '',
      exclude: false,
    });
    expect(gte(4)).toBe(true);
    expect(gte(2.96)).toBe(true);
    expect(gte(2.95)).toBe(true);
    expect(gte(2.94)).toBe(true);
    expect(gte(2)).toBe(false);
  });

  // it rounds based on the accounting precision, 2 digits
  it('builds accounting filter function for floats', () => {
    const column = NumericalColumn({
      title: 'column',
      format: NUMERICAL_FORMATS.ACCOUNTING,
      mapDataToValue: () => 0,
    });
    const eq = column.buildFilter({
      comparisons: [
        {
          value: 2.95,
          operation: 'EQ',
        },
      ],
      description: '',
      exclude: false,
    });
    expect(eq(3)).toBe(false);
    expect(eq(2.95)).toBe(true);
    expect(eq(2)).toBe(false);

    const lt = column.buildFilter({
      comparisons: [
        {
          value: 2.95,
          operation: 'LT',
        },
      ],
      description: '',
      exclude: false,
    });
    expect(lt(2)).toBe(true);
    expect(lt(2.94)).toBe(true);
    expect(lt(2.95)).toBe(false);
    expect(lt(3)).toBe(false);

    const lte = column.buildFilter({
      comparisons: [
        {
          value: 2.95,
          operation: 'LTE',
        },
      ],
      description: '',
      exclude: false,
    });
    expect(lte(2)).toBe(true);
    expect(lte(2.94)).toBe(true);
    expect(lte(2.95)).toBe(true);
    expect(lte(2.96)).toBe(false);
    expect(lte(3)).toBe(false);

    const gt = column.buildFilter({
      comparisons: [
        {
          value: 2.95,
          operation: 'GT',
        },
      ],
      description: '',
      exclude: false,
    });
    expect(gt(4)).toBe(true);
    expect(gt(3)).toBe(true);
    expect(gt(2.96)).toBe(true);
    expect(gt(2.95)).toBe(false);
    expect(gt(2.94)).toBe(false);

    const gte = column.buildFilter({
      comparisons: [
        {
          value: 2.95,
          operation: 'GTE',
        },
      ],
      description: '',
      exclude: false,
    });
    expect(gte(4)).toBe(true);
    expect(gte(2.96)).toBe(true);
    expect(gte(2.95)).toBe(true);
    expect(gte(2.94)).toBe(false);
    expect(gte(2)).toBe(false);
  });

  // it rounds based on the provided precision
  it('builds accounting filter function for floats', () => {
    const column = NumericalColumn({
      title: 'column',
      precision: 3,
      mapDataToValue: () => 0,
    });
    const eq = column.buildFilter({
      comparisons: [
        {
          value: 2.954,
          operation: 'EQ',
        },
      ],
      description: '',
      exclude: false,
    });
    expect(eq(3)).toBe(false);
    expect(eq(2.954)).toBe(true);
    expect(eq(2.95)).toBe(false);
    expect(eq(2)).toBe(false);

    const lt = column.buildFilter({
      comparisons: [
        {
          value: 2.954,
          operation: 'LT',
        },
      ],
      description: '',
      exclude: false,
    });
    expect(lt(2.95)).toBe(true);
    expect(lt(2.953)).toBe(true);
    expect(lt(2.954)).toBe(false);
    expect(lt(2.955)).toBe(false);

    const lte = column.buildFilter({
      comparisons: [
        {
          value: 2.954,
          operation: 'LTE',
        },
      ],
      description: '',
      exclude: false,
    });
    expect(lte(2.95)).toBe(true);
    expect(lte(2.953)).toBe(true);
    expect(lte(2.954)).toBe(true);
    expect(lte(2.956)).toBe(false);

    const gt = column.buildFilter({
      comparisons: [
        {
          value: 2.954,
          operation: 'GT',
        },
      ],
      description: '',
      exclude: false,
    });
    expect(gt(3)).toBe(true);
    expect(gt(2.96)).toBe(true);
    expect(gt(2.955)).toBe(true);
    expect(gt(2.954)).toBe(false);
    expect(gt(2.953)).toBe(false);
    expect(gt(2.95)).toBe(false);

    const gte = column.buildFilter({
      comparisons: [
        {
          value: 2.954,
          operation: 'GTE',
        },
      ],
      description: '',
      exclude: false,
    });
    expect(gte(3)).toBe(true);
    expect(gte(2.96)).toBe(true);
    expect(gte(2.956)).toBe(true);
    expect(gte(2.954)).toBe(true);
    expect(gte(2.953)).toBe(false);
    expect(gte(2.95)).toBe(false);
    expect(gte(2)).toBe(false);
  });

  it('builds filter function with multiple comparisons', () => {
    const column = NumericalColumn({title: 'column', mapDataToValue: () => 0});
    const eq = column.buildFilter({
      comparisons: [
        {
          value: 2,
          operation: 'EQ',
        },
        {
          value: 3,
          operation: 'EQ',
        },
      ],
      description: '',
      exclude: false,
    });
    expect(eq(2)).toBe(true);
    expect(eq(3)).toBe(true);
    expect(eq(4)).toBe(false);

    const outerExclusive = column.buildFilter({
      comparisons: [
        {
          value: 2,
          operation: 'LT',
        },
        {
          value: 8,
          operation: 'GT',
        },
      ],
      description: '',
      exclude: false,
    });
    expect(outerExclusive(1)).toBe(true);
    expect(outerExclusive(2)).toBe(false);
    expect(outerExclusive(5)).toBe(false);
    expect(outerExclusive(8)).toBe(false);
    expect(outerExclusive(9)).toBe(true);

    const outerInclusive = column.buildFilter({
      comparisons: [
        {
          value: 2,
          operation: 'LTE',
        },
        {
          value: 8,
          operation: 'GTE',
        },
      ],
      description: '',
      exclude: false,
    });
    expect(outerInclusive(1)).toBe(true);
    expect(outerInclusive(2)).toBe(true);
    expect(outerInclusive(5)).toBe(false);
    expect(outerInclusive(8)).toBe(true);
    expect(outerInclusive(9)).toBe(true);

    const innerExclusive = column.buildFilter({
      comparisons: [
        {
          value: 2,
          operation: 'LT',
        },
        {
          value: 8,
          operation: 'GT',
        },
      ],
      description: '',
      exclude: true,
    });
    expect(innerExclusive(1)).toBe(false);
    expect(innerExclusive(2)).toBe(true);
    expect(innerExclusive(5)).toBe(true);
    expect(innerExclusive(8)).toBe(true);
    expect(innerExclusive(9)).toBe(false);

    const innerInclusive = column.buildFilter({
      comparisons: [
        {
          value: 2,
          operation: 'LTE',
        },
        {
          value: 8,
          operation: 'GTE',
        },
      ],
      description: '',
      exclude: true,
    });
    expect(innerInclusive(1)).toBe(false);
    expect(innerInclusive(2)).toBe(false);
    expect(innerInclusive(5)).toBe(true);
    expect(innerInclusive(8)).toBe(false);
    expect(innerInclusive(9)).toBe(false);

    const overlapExclusive = column.buildFilter({
      comparisons: [
        {
          value: 2,
          operation: 'GT',
        },
        {
          value: 8,
          operation: 'LT',
        },
      ],
      description: '',
      exclude: false,
    });
    expect(overlapExclusive(1)).toBe(true);
    expect(overlapExclusive(2)).toBe(true);
    expect(overlapExclusive(5)).toBe(true);
    expect(overlapExclusive(8)).toBe(true);
    expect(overlapExclusive(9)).toBe(true);

    const overlapInclusive = column.buildFilter({
      comparisons: [
        {
          value: 2,
          operation: 'GTE',
        },
        {
          value: 8,
          operation: 'LTE',
        },
      ],
      description: '',
      exclude: false,
    });
    expect(overlapInclusive(1)).toBe(true);
    expect(overlapInclusive(2)).toBe(true);
    expect(overlapInclusive(5)).toBe(true);
    expect(overlapInclusive(8)).toBe(true);
    expect(overlapInclusive(9)).toBe(true);
  });

  it('builds expected sort function', () => {
    const column = NumericalColumn({title: 'column', mapDataToValue: () => 0});
    const input = [2, 1, 3, 4];
    input.sort(column.sortFn);

    const output = [4, 3, 2, 1];
    for (let i = 0; i < input.length; i++) {
      expect(input[i]).toBe(output[i]);
    }
  });
});
