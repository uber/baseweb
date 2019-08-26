/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Unstable_DataTable} from '../data-table.js';

export const name = 'data-table';

// https://gist.github.com/6174/6062387
function randomString(rowIdx, columnIdx) {
  return (
    (0.88 * rowIdx)
      .toString(36)
      .replace('.', '')
      .substring(2) + (0.99 * columnIdx).toString(36).replace('.', '')
  );
}

function makeRowsFromColumns(columns, rowCount) {
  const rows = [];
  for (let i = 0; i < rowCount; i++) {
    rows.push({
      data: columns.map((column, j) => {
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
            return randomString(i, j);
          case 'CUSTOM':
            return randomString(i, j);
          default:
            return 'default' + randomString(i, j);
        }
      }),
    });
  }
  return rows;
}

const columns = [
  {kind: 'CATEGORICAL', title: 'one'},
  {kind: 'STRING', title: 'two'},
  {kind: 'NUMERICAL', title: 'three', format: 'NONE'},
  {kind: 'NUMERICAL', title: 'four', format: 'NONE'},
  {kind: 'NUMERICAL', title: 'five', format: 'NONE'},
  {kind: 'BOOLEAN', title: 'six'},
  {kind: 'STRING', title: 'seven'},
  {kind: 'CATEGORICAL', title: 'eight'},
  {
    kind: 'CUSTOM',
    title: 'nine',
    renderCell: props => (
      <div style={{backgroundColor: 'green'}}>{props.data}</div>
    ),
  },
];

const rows = makeRowsFromColumns(columns, 2000);

export const component = () => (
  <Unstable_DataTable columns={columns} rows={rows} />
);
