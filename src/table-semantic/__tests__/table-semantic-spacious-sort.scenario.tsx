/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { TableBuilder, TableBuilderColumn, SIZE } from '..';

const DATA = [
  ['Sarah Brown', 31, '100 Broadway St., New York City, New York'],
  ['Jane Smith', 32, '100 Market St., San Francisco, California'],
  ['Joe Black', 33, '100 Macquarie St., Sydney, Australia'],
];

export function Scenario() {
  return (
    <div style={{ padding: '24px' }}>
      <TableBuilder data={DATA} sortColumn="bar" sortOrder="ASC" size={SIZE.spacious}>
        <TableBuilderColumn id="bar" header="Produce" sortable>
          {(row) => row[0]}
        </TableBuilderColumn>
        <TableBuilderColumn header="Quantity" numeric>
          {(row) => row[1]}
        </TableBuilderColumn>
      </TableBuilder>
    </div>
  );
}
