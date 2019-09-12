/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import {act} from 'react-dom/test-utils.js';

import {CustomColumn} from '../index.js';

let container: HTMLDivElement;

describe('custom column', () => {
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

  it('is not sortable by default', () => {
    const column = CustomColumn({title: 'column', renderCell: () => null});
    expect(column.sortable).toBe(false);
  });

  it('is not filterable by default', () => {
    const column = CustomColumn({title: 'column', renderCell: () => null});
    expect(column.filterable).toBe(false);
  });

  it('is not sortable if no sortFn provided', () => {
    const column = CustomColumn({
      title: 'column',
      sortable: true,
      renderCell: () => null,
    });
    expect(column.sortable).toBe(false);
  });

  it('applies provided sortable value if sortFn exists', () => {
    const column = CustomColumn({
      title: 'column',
      sortable: true,
      sortFn: () => {
        return 0;
      },
      renderCell: () => null,
    });
    expect(column.sortable).toBe(true);
  });

  it('is not filterable if neither renderFilter nor buildFilter provided', () => {
    const column = CustomColumn({
      title: 'column',
      filterable: true,
      renderCell: () => null,
    });
    expect(column.filterable).toBe(false);
  });

  it('applies provided filterable value if renderFilter and buildFilter exist', () => {
    const column = CustomColumn({
      title: 'column',
      filterable: true,
      renderFilter: () => null,
      buildFilter: params => value => true,
      renderCell: () => null,
    });
    expect(column.filterable).toBe(true);
  });

  it('cell renders according to provided renderCell', () => {
    const column = CustomColumn<{color: string}, {}>({
      title: 'column',
      renderCell: function CustomCell(props) {
        return <div>{props.value.color}</div>;
      },
    });
    const Cell = column.renderCell;

    act(() => {
      ReactDOM.render(<Cell value={{color: 'blue'}} />, container);
    });

    const cell = container.querySelector('div');

    // $FlowFixMe cell could be null
    expect(cell.textContent).toBe('blue');
  });
});
