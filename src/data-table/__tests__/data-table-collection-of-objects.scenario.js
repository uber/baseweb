/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {
  AnchorColumn,
  CategoricalColumn,
  NumericalColumn,
  Unstable_StatefulDataTable,
} from '../index.js';

import graphqlArrayData from './graphql-array-data.js';

export const name = 'data-table-collection-of-objects';

type RowDataT = {
  id: string,
  name: string,
  applicationTags: string,
  realUser: string,
  source: string,
  allocatedVCores: number,
  allocatedGB: number,
};

const columns = [
  AnchorColumn({
    title: 'Application',
    mapDataToValue: (data: RowDataT) => ({
      content: data.name,
      href: `#id=${data.id}`,
    }),
    minWidth: 130,
  }),
  AnchorColumn({
    // illustrates that this could be provided with a react-router-link
    elementAs: 'div',
    title: 'Application',
    mapDataToValue: (data: RowDataT) => ({
      content: data.realUser,
      href: `#id=${data.realUser}`,
    }),
    minWidth: 80,
  }),
  CategoricalColumn({
    title: 'Source',
    minWidth: 90,
    mapDataToValue: (data: RowDataT) => data.source,
  }),
  NumericalColumn({
    title: 'CPU vCores',
    mapDataToValue: (data: RowDataT) => data.allocatedVCores,
  }),
  NumericalColumn({
    title: 'Memory GB',
    mapDataToValue: (data: RowDataT) => data.allocatedGB,
  }),
];

const rows = [
  ...graphqlArrayData,
  ...graphqlArrayData,
  ...graphqlArrayData,
  ...graphqlArrayData,
  ...graphqlArrayData,
].map(row => ({
  id: row.id,
  data: row,
}));

export const component = () => {
  return (
    <div style={{height: '600px', width: '700px'}}>
      <Unstable_StatefulDataTable columns={columns} rows={rows} />
    </div>
  );
};
