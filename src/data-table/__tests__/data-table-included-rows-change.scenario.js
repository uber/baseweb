/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {StatefulDataTable, BooleanColumn} from '../index.js';

type RowDataT = [boolean, string, number, string, Date];

const columns = [
  BooleanColumn({
    title: 'boolean-column',
    mapDataToValue: (data: RowDataT) => data[0],
  }),
];

const rows = [
  {id: 1, data: [true]},
  {id: 2, data: [false]},
  {id: 3, data: [true]},
  {id: 4, data: [false]},
];

export default function Scenario() {
  const [includedRows, setIncludedRows] = React.useState([]);
  const handleIncludedRowsChange = React.useCallback(
    included => {
      setIncludedRows(included);
    },
    [setIncludedRows],
  );

  return (
    <React.Fragment>
      <div style={{height: '400px', width: '600px', marginBottom: '10px'}}>
        <StatefulDataTable
          columns={columns}
          rows={rows}
          onIncludedRowsChange={handleIncludedRowsChange}
        />
      </div>
      <ul>
        {includedRows.map(row => (
          <li key={row.id}>{row.id}</li>
        ))}
      </ul>
    </React.Fragment>
  );
}
