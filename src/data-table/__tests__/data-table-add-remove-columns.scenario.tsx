/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import BooleanColumn from '../column-boolean';
import { StatefulDataTable } from '../stateful-data-table';

function getColumn(index) {
  return BooleanColumn({
    title: index.toString(),
    mapDataToValue: () => true,
  });
}

const rows = new Array(5).fill().map((_, i) => ({ id: i, data: {} }));

export function Scenario() {
  const [columns, setColumns] = React.useState([getColumn(0), getColumn(1)]);
  return (
    <div>
      <button
        data-testid="add"
        onClick={() => setColumns((prev) => [...prev, getColumn(prev.length)])}
      >
        Add Column
      </button>
      <button data-testid="remove" onClick={() => setColumns((prev) => prev.slice(0, -1))}>
        Remove Column
      </button>

      <div style={{ height: '400px', width: '900px' }}>
        <StatefulDataTable resizableColumnWidths columns={columns || []} rows={rows} />
      </div>
    </div>
  );
}
