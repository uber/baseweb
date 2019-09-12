/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import {act} from 'react-dom/test-utils.js';

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

  xit('can call setFilter with expected selection', () => {
    // not implemented for numerical column
  });

  xit('builds expected filter function', () => {
    // not implemented for numerical column
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
