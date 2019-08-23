/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {DataTable} from '../data-table.js';

export const name = 'data-table';

// https://gist.github.com/6174/6062387
function randomString() {
  return (
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)
  );
}

function makeRowsFromColumns(columns, rowCount) {
  const rows = [];
  for (let i = 0; i < rowCount; i++) {
    rows.push({
      data: columns.map(column => {
        switch (column.kind) {
          case 'CATEGORICAL':
            const grade = Math.floor(Math.random() * 100);
            if (grade >= 90) {
              return 'A';
            } else if (grade >= 80) {
              return 'B';
            } else if (grade >= 70) {
              return 'C';
            } else if (grade >= 60) {
              return 'D';
            } else {
              return 'F';
            }
          case 'NUMERICAL':
            return Math.floor(Math.random() * 200);
          case 'BOOLEAN':
            return Math.random() > 0.5;
          case 'STRING':
            return randomString();
          case 'CUSTOM':
            return randomString();
          default:
            return 'default' + randomString();
        }
      }),
    });
  }
  return rows;
}

const columns = [
  {kind: 'CATEGORICAL', title: 'aslkfjalksd'},
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

const rows = makeRowsFromColumns(columns, 2000);

export const component = () => <DataTable columns={columns} rows={rows} />;
