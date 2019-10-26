// @flow

import React from 'react';
import {useStyletron} from 'baseui';
import Alert from 'baseui/icon/alert.js';
import Check from 'baseui/icon/check.js';

import {
  Unstable_DataTable,
  BooleanColumn,
  NumericalColumn,
} from 'baseui/data-table';

const columns = [
  NumericalColumn({title: 'row-id'}),
  BooleanColumn({title: 'is-it-flagged'}),
];

export default () => {
  const [rows, setRows] = React.useState([
    {id: 1, data: [1, false]},
    {id: 2, data: [2, false]},
    {id: 3, data: [3, false]},
    {id: 4, data: [4, false]},
    {id: 5, data: [5, false]},
    {id: 6, data: [6, false]},
    {id: 7, data: [7, false]},
    {id: 8, data: [8, false]},
  ]);

  function flagRows(ids) {
    const nextRows = rows.map(row => {
      if (ids.includes(row.id)) {
        const nextData = [row.data[0], true];
        return {...row, data: nextData};
      }

      return row;
    });
    setRows(nextRows);
  }

  function removeRows(ids) {
    const nextRows = rows.filter(row => !ids.includes(row.id));
    setRows(nextRows);
  }

  const actions = [
    {
      label: 'Flag',
      onClick: ({selection, clearSelection}) => {
        flagRows(selection.map(r => r.id));
        clearSelection();
      },
      renderIcon: Alert,
    },
    {
      label: 'Approve',
      onClick: ({selection, clearSelection}) => {
        removeRows(selection.map(r => r.id));
        clearSelection();
      },
      renderIcon: Check,
    },
    {
      label: 'Download',
      onClick: ({clearSelection}) => clearSelection(),
    },
  ];

  return (
    <div style={{height: '300px'}}>
      <Unstable_DataTable
        batchActions={actions}
        columns={columns}
        rows={rows}
      />
    </div>
  );
};
