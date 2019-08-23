/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {DataTable} from '../data-table.js';

export const name = 'data-table';

function makeRowsFromColumns(columns, rowCount) {
  const rows = [];
  for (let i = 0; i < rowCount; i++) {
    rows.push({
      data: columns.map(column => {
        switch (column.kind) {
          case 'CATEGORICAL':
            return 'asdf';
          case 'NUMERICAL':
            return Math.floor(Math.random() * 200);
          case 'BOOLEAN':
            return Math.random() > 0.5;
          case 'STRING':
            return 'string';
          case 'CUSTOM':
            return 'custom';
          default:
            return 'default';
        }
      }),
    });
  }
  return rows;
}

const columns = [
  {kind: 'STRING', title: 'asdflj'},
  {kind: 'NUMERICAL', title: 'jljljh', format: 'NONE'},
  {kind: 'NUMERICAL', title: 'jljljh', format: 'NONE'},
  {kind: 'NUMERICAL', title: 'jljljh', format: 'NONE'},
  {kind: 'BOOLEAN', title: 'jljljh'},
  {kind: 'STRING', title: 'jljljh'},
  {
    kind: 'CUSTOM',
    title: 'jljljh',
    renderCell: props => (
      <div style={{backgroundColor: 'green'}}>{props.data}</div>
    ),
  },
];

const rows = makeRowsFromColumns(columns, 200);

export const component = () => <DataTable columns={columns} rows={rows} />;
