/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { StatefulDataTable, CategoricalColumn, RowIndexColumn } from '../index';

import Alert from '../../icon/alert';
import Check from '../../icon/check';

const rowActions = [
  {
    label: 'Check',
    onClick: () => {},
    renderIcon: function RenderCheck({ size }) {
      return <Check size={size} />;
    },
  },

  {
    label: 'Remove',
    onClick: () => {},
    renderIcon: function RenderAlert({ size }) {
      return <Alert size={size} />;
    },
  },
];

export function Scenario() {
  const columns = [
    RowIndexColumn(),
    CategoricalColumn({
      title: 'column',
      mapDataToValue: (data: string) => data,
    }),
  ];

  const rows = [
    { id: 1, data: 'a' },
    { id: 2, data: 'b' },
    { id: 3, data: 'c' },
    { id: 4, data: 'd' },
  ];

  const initialSelectedRowIds = new Set([1]);

  return (
    <React.Fragment>
      <div style={{ height: '400px', width: '800px' }}>
        <StatefulDataTable
          initialSelectedRowIds={initialSelectedRowIds}
          columns={columns}
          rows={rows}
          batchActions={rowActions}
        />
      </div>
    </React.Fragment>
  );
}
