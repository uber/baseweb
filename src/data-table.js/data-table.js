/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

type CategoricalColumn = {|
  title: string,
  sortable?: boolean,
  filterable?: boolean,
  kind: 'CATEGORICAL',
|};

type NumericalColumn = {|
  title: string,
  sortable?: boolean,
  filterable?: boolean,
  kind: 'NUMERICAL',
  format: 'ACCOUNTING' | 'PERCENTAGE' | 'NONE',
  highlightNegative?: boolean,
  precision?: number,
|};

type BooleanColumn = {|
  title: string,
  sortable?: boolean,
  filterable?: boolean,
  kind: 'BOOLEAN',
|};

type StringColumn = {|
  title: string,
  sortable?: boolean,
  filterable?: boolean,
  kind: 'STRING',
|};

type CustomColumn = {|
  title: string,
  sortable?: boolean,
  filterable?: boolean,
  kind: 'CUSTOM',
  renderCell: React.ComponentType<{data: any}>,
  renderFilter?: React.ComponentType<{
    filterParams: any,
    title: string,
    description: string,
  }>,
  buildFilter?: any => any => boolean,
  sortFn?: (any, any) => number,
|};

type Row = {
  data: any[],
};

type Props = {
  columns: Array<
    | CategoricalColumn
    | NumericalColumn
    | BooleanColumn
    | StringColumn
    | CustomColumn,
  >,
  rows: Row[],
};

export function DataTable(props: Props) {
  return (
    <table>
      <thead>
        <tr>
          {props.columns.map(column => (
            <td>{column.title}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.rows.map(row => (
          <tr>
            {row.data.map((d, i) => {
              const column = props.columns[i];
              if (column.kind === 'CATEGORICAL') {
                return <td>{d}</td>;
              } else if (column.kind === 'NUMERICAL') {
                return <td>{d}</td>;
              } else if (column.kind === 'BOOLEAN') {
                return <td>{d ? 'T' : 'F'}</td>;
              } else if (column.kind === 'STRING') {
                return <td>{d}</td>;
              } else if (column.kind === 'CUSTOM') {
                const Cell = column.renderCell;
                return <Cell data={d} />;
              } else {
                return null;
              }
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
