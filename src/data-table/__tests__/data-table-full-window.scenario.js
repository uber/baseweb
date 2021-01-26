/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {
  StatefulDataTable,
  BooleanColumn,
  CategoricalColumn,
  NumericalColumn,
  StringColumn,
} from '../index.js';

type RowDataT = [boolean, string, number, string];

export default function Scenario() {
  const columns = [
    BooleanColumn({
      title: 'boolean-column',
      mapDataToValue: (data: RowDataT) => data[0],
    }),
    CategoricalColumn({
      title: 'categorical-column',
      mapDataToValue: (data: RowDataT) => data[1],
    }),
    NumericalColumn({
      title: 'numerical-column',
      mapDataToValue: (data: RowDataT) => data[2],
    }),
    StringColumn({
      title: 'string-column',
      mapDataToValue: (data: RowDataT) => data[3],
    }),
  ];

  const rows = [
    {id: 1, data: [true, 'A', 2, 'one']},
    {id: 2, data: [false, 'B', 1, 'two']},
    {id: 3, data: [true, 'A', 4, 'three']},
    {id: 4, data: [false, 'A', 3, 'four']},
  ];

  return (
    <div style={{height: '100vh', width: '100vw'}}>
      <StatefulDataTable columns={columns} rows={rows} />
    </div>
  );
}
