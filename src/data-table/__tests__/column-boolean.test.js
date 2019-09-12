/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import {act} from 'react-dom/test-utils.js';

import {BooleanColumn} from '../index.js';

let container: HTMLDivElement;

describe('boolean column', () => {
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
      }
    }
  });

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

    act(() => {
      ReactDOM.render(<Cell value={true} />, container);
    });

    const cell = container.querySelector('div');

    // $FlowFixMe cell may be null
    expect(cell.textContent).toBe('T');
  });

  it('cell renders F if false value provided', () => {
    const column = BooleanColumn({title: 'column'});
    const Cell = column.renderCell;

    act(() => {
      ReactDOM.render(<Cell value={false} />, container);
    });

    const cell = container.querySelector('div');

    // $FlowFixMe cell could be null
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
