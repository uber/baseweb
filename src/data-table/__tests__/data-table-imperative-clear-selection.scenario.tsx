/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import Check from '../../icon/check';

import NumericalColumn from '../column-numerical';
import { StatefulDataTable } from '../stateful-data-table';

type RowData = number;

const columns = [
  NumericalColumn({
    title: 'row-id',
    mapDataToValue: (data: RowData) => data,
  }),

  NumericalColumn({
    title: 'filler',
    mapDataToValue: (data: RowData) => data,
  }),
];

export function Scenario() {
  const controlRef = React.useRef(null);
  const [rows, setRows] = React.useState([
    { id: 1, data: 1 },
    { id: 2, data: 2 },
    { id: 3, data: 3 },
    { id: 4, data: 4 },
    { id: 5, data: 5 },
  ]);

  function removeRows(ids) {
    const nextRows = rows.filter((row) => !ids.includes(row.id));
    setRows(nextRows);
  }

  const batchActions = [
    {
      label: 'Remove selected rows',
      onClick: ({ selection, clearSelection }) => {
        removeRows(selection.map((r) => r.id));
        clearSelection();
      },
    },
  ];

  const rowActions = [
    {
      label: 'Remove row',
      onClick: ({ row }) => {
        removeRows([row.id]);
        if (controlRef.current) {
          console.log('here');
          controlRef.current.clearSelection();
        }
      },
      renderIcon: function RenderCheck({ size }) {
        return <Check size={size} />;
      },
    },
  ];

  return (
    <div>
      <div style={{ height: '400px', width: '900px' }}>
        <StatefulDataTable
          batchActions={batchActions}
          rowActions={rowActions}
          controlRef={controlRef}
          columns={columns}
          rows={rows}
        />
      </div>
    </div>
  );
}
