/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { StatefulDataTable, StringColumn } from '..';

export function Scenario() {
  const [rows, setRows] = React.useState([
    { id: 1, data: 'a' },
    { id: 2, data: 'b' },
    { id: 3, data: 'c' },
    { id: 4, data: 'd' },
  ]);

  const columns = [
    StringColumn({ title: 'a', mapDataToValue: (data: string) => data }),
    StringColumn({ title: 'b', mapDataToValue: (data: string) => data }),
    StringColumn({ title: 'c', mapDataToValue: (data: string) => data }),
    StringColumn({ title: 'd', mapDataToValue: (data: string) => data }),
  ];

  function handleMakeStringsLong() {
    setRows(rows.map((row) => ({ ...row, data: 'a'.repeat(40) })));
  }

  return (
    <React.Fragment>
      <button onClick={handleMakeStringsLong}>make strings long</button>
      <div style={{ height: '400px', width: '800px' }}>
        <StatefulDataTable columns={columns} rows={rows} />
      </div>
    </React.Fragment>
  );
}
