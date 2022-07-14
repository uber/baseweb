/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { StatefulDataTable, BooleanColumn, CategoricalColumn } from '..';

type RowData = [boolean, string];

export function Scenario() {
  const columns = [
    BooleanColumn({
      title: 'first',
      mapDataToValue: (data: RowData) => data[0],
    }),

    CategoricalColumn({
      title: 'second',
      mapDataToValue: (data: RowData) => data[1],
    }),
  ];

  return (
    <React.Fragment>
      <div style={{ height: '200px', width: '800px' }}>
        <StatefulDataTable loading columns={columns} rows={[]} />
      </div>
      <div style={{ height: '200px', width: '800px' }}>
        <StatefulDataTable
          loading
          loadingMessage="string loading message"
          columns={columns}
          rows={[]}
        />
      </div>
      <div style={{ height: '200px', width: '800px' }}>
        <StatefulDataTable
          loading
          loadingMessage={() => <h1>component loading message</h1>}
          columns={columns}
          rows={[]}
        />
      </div>
    </React.Fragment>
  );
}
