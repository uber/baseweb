/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import {act} from 'react-dom/test-utils.js';

import {setNativeValue} from './shared.js';
import {NumericalColumn, NUMERICAL_FORMATS} from '../index.js';

let container: HTMLDivElement;

describe('numerical column', () => {
  beforeEach(() => {
    if (__BROWSER__) {
      container = document.createElement('div');
      if (document.body) {
        document.body.appendChild(container);
      }
    }
  });

  afterEach(() => {
    if (__BROWSER__) {
      if (document.body && container) {
        document.body.removeChild(container);
        container.remove();
      }
    }
  });

  it('is sortable by default', () => {
    const column = NumericalColumn({title: 'column'});
    expect(column.sortable).toBe(true);
  });

  it('is filterable by default', () => {
    const column = NumericalColumn({title: 'column'});
    expect(column.filterable).toBe(true);
  });

  it('applies provided sortable value', () => {
    const column = NumericalColumn({title: 'column', sortable: false});
    expect(column.sortable).toBe(false);
  });

  it('applies provided filterable value', () => {
    const column = NumericalColumn({title: 'column', filterable: false});
    expect(column.filterable).toBe(false);
  });

  it('cell renders provided value with default options', () => {
    const column = NumericalColumn({title: 'column'});
    const Cell = column.renderCell;
    act(() => {
      ReactDOM.render(<Cell value={1999.888} />, container);
    });
    const cell = container.querySelector('div');

    // $FlowFixMe cell could be null
    expect(cell.textContent).toBe('2000');
  });

  it('cell renders positive value according to accounting format', () => {
    const column = NumericalColumn({
      title: 'column',
      format: NUMERICAL_FORMATS.ACCOUNTING,
    });
    const Cell = column.renderCell;
    act(() => {
      ReactDOM.render(<Cell value={1999.888} />, container);
    });
    const cell = container.querySelector('div');

    // $FlowFixMe cell could be null
    expect(cell.textContent).toBe('$1999.89');
  });

  it('cell renders negative value according to accounting format', () => {
    const column = NumericalColumn({
      title: 'column',
      format: NUMERICAL_FORMATS.ACCOUNTING,
    });
    const Cell = column.renderCell;
    act(() => {
      ReactDOM.render(<Cell value={-1999.888} />, container);
    });
    const cell = container.querySelector('div');

    // $FlowFixMe cell could be null
    expect(cell.textContent).toBe('($1999.89)');
  });

  it('cell renders value according to percentage format', () => {
    const column = NumericalColumn({
      title: 'column',
      format: NUMERICAL_FORMATS.PERCENTAGE,
    });
    const Cell = column.renderCell;
    act(() => {
      ReactDOM.render(<Cell value={1999.888} />, container);
    });
    const cell = container.querySelector('div');

    // $FlowFixMe cell could be null
    expect(cell.textContent).toBe('1999.89%');
  });

  it('cell renders value according to provided precision', () => {
    const column = NumericalColumn({
      title: 'column',
      precision: 3,
    });
    const Cell = column.renderCell;
    act(() => {
      ReactDOM.render(<Cell value={1999.888} />, container);
    });
    const cell = container.querySelector('div');

    // $FlowFixMe cell could be null
    expect(cell.textContent).toBe('1999.888');
  });

  it('can call setFilter with expected selection', () => {
    const column = NumericalColumn({title: 'column'});
    const Filter = column.renderFilter;

    const mockSetFilter = jest.fn();
    const data = [1, 2, 3, 4];
    act(() => {
      ReactDOM.render(
        <Filter setFilter={mockSetFilter} close={() => {}} data={data} />,
        container,
      );
    });

    const input = container.querySelector('div[data-baseweb="input"] input');
    act(() => {
      if (__BROWSER__) {
        setNativeValue((input: any), '2');
        // $FlowFixMe input may be null
        input.dispatchEvent(new Event('input', {bubbles: true}));
      }
    });

    const buttons = container.querySelectorAll('button');
    buttons.forEach(button => {
      if (button.textContent === 'Apply') {
        act(() => {
          if (__BROWSER__) {
            button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
          }
        });
      }
    });

    expect(mockSetFilter.mock.calls.length).toBe(1);
    const [filterParams, description] = mockSetFilter.mock.calls[0];
    expect(filterParams.value).toBe(2);
    expect(filterParams.exclude).toBe(false);
    expect(filterParams.operation).toBe('LT');
    expect(description).toBe('LT 2');
  });

  it('hides operators if filter single value', () => {
    const column = NumericalColumn({title: 'column'});
    const Filter = column.renderFilter;

    const mockSetFilter = jest.fn();
    const data = [1, 2, 3, 4];
    act(() => {
      ReactDOM.render(
        <Filter setFilter={mockSetFilter} close={() => {}} data={data} />,
        container,
      );
    });

    const before = container.querySelectorAll(
      'div[data-baseweb="button-group"]',
    );
    expect(before.length).toBe(2);

    const buttons = container.querySelectorAll('button');
    buttons.forEach(button => {
      if (button.textContent === 'Single Value') {
        act(() => {
          if (__BROWSER__) {
            button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
          }
        });
      }
    });

    const after = container.querySelectorAll(
      'div[data-baseweb="button-group"]',
    );
    expect(after.length).toBe(1);
  });

  it('builds default filter function for integers', () => {
    const column = NumericalColumn({title: 'column'});
    const eq = column.buildFilter({
      value: 2,
      operation: 'EQ',
      exclude: false,
    });
    expect(eq(2)).toBe(true);
    expect(eq(-2)).toBe(false);

    const lt = column.buildFilter({
      value: 2,
      operation: 'LT',
      exclude: false,
    });
    expect(lt(1)).toBe(true);
    expect(lt(2)).toBe(false);

    const lte = column.buildFilter({
      value: 2,
      operation: 'LTE',
      exclude: false,
    });
    expect(lte(1)).toBe(true);
    expect(lte(2)).toBe(true);
    expect(lte(3)).toBe(false);

    const gt = column.buildFilter({
      value: 2,
      operation: 'GT',
      exclude: false,
    });
    expect(gt(3)).toBe(true);
    expect(lt(2)).toBe(false);

    const gte = column.buildFilter({
      value: 2,
      operation: 'GTE',
      exclude: false,
    });
    expect(gte(3)).toBe(true);
    expect(gte(2)).toBe(true);
    expect(gte(1)).toBe(false);
  });

  // it rounds based on the default precision, which is 0, so to closest whole number.
  it('builds default filter function for floats', () => {
    const column = NumericalColumn({title: 'column'});
    const eq = column.buildFilter({
      value: 2.95,
      operation: 'EQ',
      exclude: false,
    });
    expect(eq(3)).toBe(true);
    expect(eq(2.95)).toBe(true);
    expect(eq(2)).toBe(false);

    const lt = column.buildFilter({
      value: 2.95,
      operation: 'LT',
      exclude: false,
    });
    expect(lt(1)).toBe(true);
    expect(lt(2)).toBe(true);
    expect(lt(2.94)).toBe(false);
    expect(lt(2.95)).toBe(false);
    expect(lt(3)).toBe(false);

    const lte = column.buildFilter({
      value: 2.95,
      operation: 'LTE',
      exclude: false,
    });
    expect(lte(2)).toBe(true);
    expect(lte(2.94)).toBe(true);
    expect(lte(2.95)).toBe(true);
    expect(lte(2.96)).toBe(true);
    expect(lte(3)).toBe(true);
    expect(lte(4)).toBe(false);

    const gt = column.buildFilter({
      value: 2.95,
      operation: 'GT',
      exclude: false,
    });
    expect(gt(4)).toBe(true);
    expect(gt(3)).toBe(false);
    expect(lt(2.96)).toBe(false);

    const gte = column.buildFilter({
      value: 2.95,
      operation: 'GTE',
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
    });
    const eq = column.buildFilter({
      value: 2.95,
      operation: 'EQ',
      exclude: false,
    });
    expect(eq(3)).toBe(false);
    expect(eq(2.95)).toBe(true);
    expect(eq(2)).toBe(false);

    const lt = column.buildFilter({
      value: 2.95,
      operation: 'LT',
      exclude: false,
    });
    expect(lt(2)).toBe(true);
    expect(lt(2.94)).toBe(true);
    expect(lt(2.95)).toBe(false);
    expect(lt(3)).toBe(false);

    const lte = column.buildFilter({
      value: 2.95,
      operation: 'LTE',
      exclude: false,
    });
    expect(lte(2)).toBe(true);
    expect(lte(2.94)).toBe(true);
    expect(lte(2.95)).toBe(true);
    expect(lte(2.96)).toBe(false);
    expect(lte(3)).toBe(false);

    const gt = column.buildFilter({
      value: 2.95,
      operation: 'GT',
      exclude: false,
    });
    expect(gt(4)).toBe(true);
    expect(gt(3)).toBe(true);
    expect(gt(2.96)).toBe(true);
    expect(gt(2.95)).toBe(false);
    expect(gt(2.94)).toBe(false);

    const gte = column.buildFilter({
      value: 2.95,
      operation: 'GTE',
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
    });
    const eq = column.buildFilter({
      value: 2.954,
      operation: 'EQ',
      exclude: false,
    });
    expect(eq(3)).toBe(false);
    expect(eq(2.954)).toBe(true);
    expect(eq(2.95)).toBe(false);
    expect(eq(2)).toBe(false);

    const lt = column.buildFilter({
      value: 2.954,
      operation: 'LT',
      exclude: false,
    });
    expect(lt(2.95)).toBe(true);
    expect(lt(2.953)).toBe(true);
    expect(lt(2.954)).toBe(false);
    expect(lt(2.955)).toBe(false);

    const lte = column.buildFilter({
      value: 2.954,
      operation: 'LTE',
      exclude: false,
    });
    expect(lte(2.95)).toBe(true);
    expect(lte(2.953)).toBe(true);
    expect(lte(2.954)).toBe(true);
    expect(lte(2.956)).toBe(false);

    const gt = column.buildFilter({
      value: 2.954,
      operation: 'GT',
      exclude: false,
    });
    expect(gt(3)).toBe(true);
    expect(gt(2.96)).toBe(true);
    expect(gt(2.955)).toBe(true);
    expect(gt(2.954)).toBe(false);
    expect(gt(2.953)).toBe(false);
    expect(gt(2.95)).toBe(false);

    const gte = column.buildFilter({
      value: 2.954,
      operation: 'GTE',
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

  it('builds expected sort function', () => {
    const column = NumericalColumn({title: 'column'});
    const input = [2, 1, 3, 4];
    input.sort(column.sortFn);

    const output = [4, 3, 2, 1];
    for (let i = 0; i < input.length; i++) {
      expect(input[i]).toBe(output[i]);
    }
  });
});
