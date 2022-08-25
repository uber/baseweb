/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { StatefulDataTable, BooleanColumn, CategoricalColumn, NumericalColumn } from '..';

type RowData = [boolean, string, number, string, Date];

export function Scenario() {
  const columns = [
    BooleanColumn({
      title: 'boolean-column',
      mapDataToValue: (data: RowData) => data[0],
    }),

    CategoricalColumn({
      title: 'categorical-column',
      mapDataToValue: (data: RowData) => data[1],
    }),

    NumericalColumn({
      title: 'numerical-column',
      mapDataToValue: (data: RowData) => data[2],
    }),
  ];

  const rows = [
    { id: 1, data: [true, 'A', 2] },
    { id: 2, data: [false, 'B', 1] },
    { id: 3, data: [true, 'A', 4] },
    { id: 4, data: [false, 'A', 3] },
  ];

  return (
    <React.Fragment>
      <div style={{ height: '600px', width: '1000px', marginBottom: '100px' }}>
        <StatefulDataTable searchable={false} columns={columns} rows={rows} />
      </div>
    </React.Fragment>
  );
}
