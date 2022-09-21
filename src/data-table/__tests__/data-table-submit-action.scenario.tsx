/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import ChevronLeft from '../../icon/chevron-left';
import BooleanColumn from '../column-boolean';
import NumericalColumn from '../column-numerical';
import { StatefulDataTable } from '../stateful-data-table';

type RowData = [number, boolean];

const columns = [
  NumericalColumn({
    title: 'row-id',
    mapDataToValue: (data: RowData) => data[0],
  }),

  BooleanColumn({
    title: 'has-it-been-submitted',
    mapDataToValue: (data: RowData) => data[1],
  }),
];

export function Scenario() {
  const [submitCount, setSubmitCount] = React.useState(0);

  const [rows, setRows] = React.useState([
    { id: 1, data: [1, false] },
    { id: 2, data: [2, false] },
    { id: 3, data: [3, false] },
    { id: 4, data: [4, false] },
    { id: 5, data: [5, false] },
  ]);

  function submitRows(ids) {
    const nextRows = rows.map((row) => {
      if (ids.includes(row.id)) {
        const nextData = [row.data[0], true];
        return { ...row, data: nextData };
      }

      return row;
    });
    setRows(nextRows);
  }

  function unsubmitRows(ids) {
    const nextRows = rows.map((row) => {
      if (ids.includes(row.id)) {
        const nextData = [row.data[0], false];
        return { ...row, data: nextData };
      }

      return row;
    });
    setRows(nextRows);
  }

  const actions = [
    {
      label: 'Un-submit',
      onClick: ({ selection, clearSelection }) => {
        setSubmitCount(selection.length);
        unsubmitRows(selection.map((r) => r.id));
        clearSelection();
      },
      renderIcon: ({ size }) => <ChevronLeft size={size} title="" />,
    },

    {
      label: 'Submit',
      onClick: ({ clearSelection, selection }) => {
        setSubmitCount(selection.length);
        submitRows(selection.map((r) => r.id));
        clearSelection();
      },
    },
  ];

  return (
    <React.Fragment>
      <div style={{ height: '400px', width: '900px' }}>
        <StatefulDataTable columns={columns} submitActions={actions} rows={rows} />
      </div>
      <p id="selection-change-count">Submitted {submitCount} rows</p>
    </React.Fragment>
  );
}
