/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import Alert from '../../icon/alert.js';
import Check from '../../icon/check.js';

import BooleanColumn from '../column-boolean.js';
import NumericalColumn from '../column-numerical.js';
import {Unstable_StatefulDataTable} from '../stateful-data-table.js';

export const name = 'data-table-batch-action';

type RowDataT = [number, boolean];

const columns = [
  NumericalColumn({
    title: 'row-id',
    mapDataToValue: (data: RowDataT) => data[0],
  }),
  BooleanColumn({
    title: 'is-it-flagged',
    mapDataToValue: (data: RowDataT) => data[1],
  }),
];

export const component = () => {
  const [count, setCount] = React.useState(0);
  const [rows, setRows] = React.useState([
    {id: 1, data: [1, false]},
    {id: 2, data: [2, false]},
    {id: 3, data: [3, false]},
    {id: 4, data: [4, false]},
    {id: 5, data: [5, false]},
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
    <div>
      <div style={{height: '800px', width: '900px'}}>
        <Unstable_StatefulDataTable
          batchActions={actions}
          columns={columns}
          onSelectionChange={() => setCount(count + 1)}
          rows={rows}
        />
      </div>
      <p id="selection-change-count">selection change count: {count}</p>
    </div>
  );
};
