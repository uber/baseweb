/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {useStyletron} from '../../styles/index.js';

import BooleanColumn from '../column-boolean.js';
import CategoricalColumn from '../column-categorical.js';
import CustomColumn from '../column-custom.js';
import NumericalColumn from '../column-numerical.js';
import StringColumn from '../column-string.js';
import {COLUMNS, NUMERICAL_FORMATS} from '../constants.js';
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
            // eslint-disable-next-line no-case-declarations
            let base = i % 2 ? i - 1 : i + 3;
            if (!(i % 4)) base *= -1;
            return (base * 99999) / 100;
          case COLUMNS.BOOLEAN:
            return i % 2 === 0;
          case COLUMNS.STRING:
            return pseudoRandomString(i, j);
          case COLUMNS.CUSTOM:
            switch (i % 4) {
              case 3:
                return {color: 'green'};
              case 2:
                return {color: 'blue'};
              case 1:
                return {color: 'purple'};
              case 0:
              default:
                return {color: 'red'};
            }
          default:
            return 'default' + pseudoRandomString(i, j);
        }
      }),
    });
  }
  return rows;
}

const columns = [
  CategoricalColumn({title: 'categorical'}),
  NumericalColumn({title: 'numerical'}),
  NumericalColumn({title: 'neg std', highlight: n => n < 0}),
  NumericalColumn({title: 'accounting', format: NUMERICAL_FORMATS.ACCOUNTING}),
  NumericalColumn({title: 'percent', format: NUMERICAL_FORMATS.PERCENTAGE}),
  CustomColumn<{color: string}, {}>({
    title: 'custom color',
    renderCell: function Cell(props) {
      const [useCss] = useStyletron();
      return (
        <div
          className={useCss({
            alignItems: 'center',
            fontFamily: '"Comic Sans MS", cursive, sans-serif',
            display: 'flex',
          })}
        >
          <div
            className={useCss({
              backgroundColor: props.value.color,
              height: '12px',
              marginRight: '24px',
              width: '12px',
            })}
          />
          <div>{props.value.color}</div>
        </div>
      );
    },
  }),
  StringColumn({title: 'string'}),
  BooleanColumn({title: 'boolean'}),
  CategoricalColumn({title: 'second category'}),
];

const rows = makeRowsFromColumns(columns, 2000);

export const component = () => {
  return (
    <div style={{height: '800px', width: '900px'}}>
      <Unstable_DataTable columns={columns} rows={rows} />
    </div>
  );
};
