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
function pseudoRandomString(rowIdx, columnIdx) {
  return (
    (0.88 * rowIdx)
      .toString(36)
      .replace('.', '')
      .substring(2) + (0.99 * columnIdx).toString(36).replace('.', '')
  ).slice(0, 10);
}

function makeRowsFromColumns(columns, rowCount) {
  const rows = [];
  for (let i = 0; i < rowCount; i++) {
    rows.push({
      data: columns.map((column, j) => {
        switch (column.kind) {
          case COLUMNS.CATEGORICAL:
            switch (i % 5) {
              case 4:
                return 'A';
              case 3:
                return 'B';
              case 2:
                return 'C';
              case 1:
                return 'D';
              case 0:
              default:
                return 'F';
            }
          case COLUMNS.NUMERICAL:
            return i % 2 ? i - 1 : i + 3;
          case COLUMNS.BOOLEAN:
            return i % 2 === 0;
          case COLUMNS.STRING:
            return pseudoRandomString(i, j);
          case COLUMNS.CUSTOM:
            return pseudoRandomString(i, j);
          default:
            return 'default' + pseudoRandomString(i, j);
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
  {
    kind: COLUMNS.CUSTOM,
    title: 'four',
    renderCell: function Cell(props) {
      const [useCss] = useStyletron();
      return <div className={useCss({color: 'green'})}>{props.data}</div>;
    },
  },
  {kind: COLUMNS.BOOLEAN, title: 'five'},
  {kind: COLUMNS.CATEGORICAL, title: 'six'},
  {kind: COLUMNS.STRING, title: 'seven'},
  {kind: COLUMNS.STRING, title: 'eight'},
  {kind: COLUMNS.STRING, title: 'nine'},
];

const rows = makeRowsFromColumns(columns, 2000);

export const component = () => {
  return (
    <div style={{height: '800px', width: '900px'}}>
      <Unstable_DataTable columns={columns} rows={rows} />
    </div>
  );
};
