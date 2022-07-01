/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { useStyletron } from '../styles/index';

import Column from './column';
import { COLUMNS } from './constants';
import type { ColumnT } from './types';

type ValueT = null;
type FilterParametersT = {};
type RowIndexColumnT = ColumnT<ValueT, FilterParametersT>;

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

function RowIndexColumn(): RowIndexColumnT {
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
