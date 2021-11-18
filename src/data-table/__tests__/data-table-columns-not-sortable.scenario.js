/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {
  StatefulDataTable,
  BooleanColumn,
  CategoricalColumn,
  DatetimeColumn,
  NumericalColumn,
  StringColumn,
} from '../index.js';

type RowDataT = [boolean, string, number, string, Date];

export function Scenario() {
  const columns = [
    BooleanColumn({
      title: 'boolean-column',
      mapDataToValue: (data: RowDataT) => data[0],
      sortable: false,
    }),

    CategoricalColumn({
      title: 'categorical-column',
      mapDataToValue: (data: RowDataT) => data[1],
      sortable: false,
    }),

    NumericalColumn({
      title: 'numerical-column',
      mapDataToValue: (data: RowDataT) => data[2],
      sortable: false,
    }),

    StringColumn({
      title: 'string-column',
      mapDataToValue: (data: RowDataT) => data[3],
      sortable: false,
    }),

    DatetimeColumn({
      title: 'datetime-column',
      mapDataToValue: (data: RowDataT) => data[4],
      sortable: false,
    }),
  ];

  const rows = [
    {id: 1, data: [true, 'A', 2, 'one', new Date('2012-05-11T10:20:30')]},
    {id: 2, data: [false, 'B', 1, 'two', new Date('2011-04-12T11:21:31')]},
    {id: 3, data: [true, 'A', 4, 'three', new Date('2014-07-13T12:22:32')]},
    {id: 4, data: [false, 'A', 3, 'four', new Date('2013-06-14T13:23:33')]},
  ];

  return (
    <React.Fragment>
      <div style={{height: '600px', width: '1000px', marginBottom: '100px'}}>
        <StatefulDataTable columns={columns} rows={rows} />
      </div>
    </React.Fragment>
  );
}
