/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import CategoricalColumn from '../column-categorical.js';
import StringColumn from '../column-string.js';
import {Unstable_StatefulDataTable} from '../stateful-data-table.js';

import AnimalData from './animal-data.js';

export const name = 'data-table-text-search';

type RowDataT = {
  Name: string,
  Kingdom: string,
  Phylum: string,
  Class: string,
  Order: string,
  Family: string,
};

const columns = [
  StringColumn({
    title: 'Name',
    minWidth: 300,
    mapDataToValue: (data: RowDataT) => data.Name,
  }),
  CategoricalColumn({
    title: 'Kingdom',
    mapDataToValue: (data: RowDataT) => data.Kingdom,
  }),
  CategoricalColumn({
    title: 'Phylum',
    minWidth: 90,
    mapDataToValue: (data: RowDataT) => data.Phylum,
  }),
  CategoricalColumn({
    title: 'Class',
    minWidth: 120,
    mapDataToValue: (data: RowDataT) => data.Class,
  }),
  CategoricalColumn({
    title: 'Order',
    mapDataToValue: (data: RowDataT) => data.Order,
  }),
  CategoricalColumn({
    title: 'Family',
    mapDataToValue: (data: RowDataT) => data.Family,
  }),
];

const rows = AnimalData.map(row => {
  return {
    id: row.Name,
    data: row,
  };
});

export const component = () => {
  return (
    <div style={{height: '600px', width: '700px'}}>
      <Unstable_StatefulDataTable columns={columns} rows={rows} />
    </div>
  );
};
