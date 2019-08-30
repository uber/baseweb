/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {useStyletron} from '../../styles/index.js';
import {COLUMNS} from '../constants.js';
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
          case COLUMNS.CATEGORICAL:
            // eslint-disable-next-line no-case-declarations
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
          case COLUMNS.NUMERICAL:
            return Math.floor(Math.random() * 200);
          case COLUMNS.BOOLEAN:
            return Math.random() > 0.5;
          case COLUMNS.STRING:
            return randomString(i, j);
          case COLUMNS.CUSTOM:
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
  {kind: COLUMNS.CATEGORICAL, title: 'one'},
  {kind: COLUMNS.STRING, title: 'two'},
  {kind: COLUMNS.NUMERICAL, title: 'three', format: 'NONE'},
  {kind: COLUMNS.NUMERICAL, title: 'four', format: 'NONE'},
  {kind: COLUMNS.NUMERICAL, title: 'five', format: 'NONE'},
  {kind: COLUMNS.BOOLEAN, title: 'six'},
  {kind: COLUMNS.STRING, title: 'seven'},
  {kind: COLUMNS.CATEGORICAL, title: 'eight'},
  {
    kind: COLUMNS.CUSTOM,
    title: 'nine',
    renderCell: function Cell(props) {
      const [useCss] = useStyletron();
      return <div className={useCss({color: 'green'})}>{props.data}</div>;
    },
  },
];

const rows = makeRowsFromColumns(columns, 2000);

export const component = () => {
  return (
    <div style={{height: '800px', width: '900px'}}>
      <Unstable_DataTable columns={columns} rows={rows} />
    </div>
  );
};
