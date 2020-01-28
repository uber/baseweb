/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {render} from '@testing-library/react';

import {CustomColumn} from '../index.js';

describe('custom column', () => {
  it('is not sortable by default', () => {
    const column = CustomColumn({
      title: 'column',
      renderCell: () => null,
      mapDataToValue: () => null,
    });
    expect(column.sortable).toBe(false);
  });

  it('is not filterable by default', () => {
    const column = CustomColumn({
      title: 'column',
      renderCell: () => null,
      mapDataToValue: () => null,
    });
    expect(column.filterable).toBe(false);
  });

  it('is not sortable if no sortFn provided', () => {
    const column = CustomColumn({
      title: 'column',
      sortable: true,
      renderCell: () => null,
      mapDataToValue: () => null,
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
      mapDataToValue: () => null,
    });
    expect(column.sortable).toBe(true);
  });

  it('is not filterable if neither renderFilter nor buildFilter provided', () => {
    const column = CustomColumn({
      title: 'column',
      filterable: true,
      renderCell: () => null,
      mapDataToValue: () => null,
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
      mapDataToValue: () => null,
    });
    expect(column.filterable).toBe(true);
  });

  it('cell renders according to provided renderCell', () => {
    const column = CustomColumn<{color: string}, {description: string}>({
      title: 'column',
      renderCell: function CustomCell(props) {
        return <div>{props.value.color}</div>;
      },
      mapDataToValue: () => ({color: 'blue'}),
    });
    const Cell = column.renderCell;

    const {container} = render(<Cell value={{color: 'blue'}} />);
    const cell = container.querySelector('div');
    expect(cell.textContent).toBe('blue');
  });
});
