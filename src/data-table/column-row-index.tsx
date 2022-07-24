/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { useStyletron } from '../styles';

import Column from './column';
import { COLUMNS } from './constants';
import type { ColumnOptions } from './types';

type Value = null;
type FilterParameters = {};
type RowIndexColumn = ColumnOptions<Value, FilterParameters>;

function RowIndexFilter() {
  return <div>not implemented for row index column</div>;
}

function RowIndexCell(props) {
  const [css, theme] = useStyletron();
  return (
    <div
      className={css({
        display: 'flex',
        justifyContent: theme.direction !== 'rtl' ? 'flex-end' : 'flex-start',
        width: '100%',
      })}
    >
      {props.y + 1}
    </div>
  );
}

function RowIndexColumn(): RowIndexColumn {
  return Column({
    kind: COLUMNS.ROW_INDEX,
    buildFilter: () => () => true,
    cellBlockAlign: 'start', // how to configure?
    fillWidth: false,
    filterable: false,
    mapDataToValue: () => null,
    renderCell: RowIndexCell,
    renderFilter: RowIndexFilter,
    sortable: false,
    sortFn: () => 0,
    title: '',
  });
}

export default RowIndexColumn;
