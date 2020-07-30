/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {BrowserRouter, Link} from 'react-router-dom';

import {
  AnchorColumn,
  CustomColumn,
  StringColumn,
  NumericalColumn,
  Unstable_StatefulDataTable,
} from '../index.js';

type RowDataT = {|
  href: string,
  content: string,
  count: number,
|};

const AnchorColumn2 = CustomColumn({
  title: 'Table name',
  mapDataToValue: data => data.table,
  minWidth: 80,
  renderCell: function Cell({value}: {value: any}) {
    return (
      <div>
        <Link to={''}>{value}</Link>
      </div>
    );
  },
});

const columns = [
  NumericalColumn({
    title: 'Count',
    mapDataToValue: ({count}) => count,
    minWidth: 240,
  }),
  // $FlowFixMe
  CustomColumn({
    // title: 'Link Custom',
    // mapDataToValue: ({content, href}) => ({content, href}),
    // minWidth: 240,
    ...StringColumn({
      title: 'Table name',
      mapDataToValue: data => data.content,
      minWidth: 240,
    }),
    renderCell: function Cell({value}) {
      return (
        <div>
          <Link to="/path">{value}</Link>
        </div>
      );
    },
  }),
  AnchorColumn({
    title: 'Link Anchor',
    mapDataToValue: ({content, href}) => ({content, href}),
    minWidth: 240,
  }),
];

const rows = new Array(2000).fill(null).map((_, index) => ({
  id: index,
  data: {
    href: '/path',
    content: 'baseweb docs',
    count: index,
  },
}));

export default function Scenario() {
  return (
    <BrowserRouter>
      <div style={{height: '600px', width: '700px'}}>
        <Unstable_StatefulDataTable columns={columns} rows={rows} />
      </div>
    </BrowserRouter>
  );
}
