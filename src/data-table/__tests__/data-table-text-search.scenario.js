/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

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

const columns = [
  StringColumn({title: 'Name', minWidth: 300}),
  CategoricalColumn({title: 'Kingdom'}),
  CategoricalColumn({title: 'Phylum', minWidth: 90}),
  CategoricalColumn({title: 'Class', minWidth: 120}),
  CategoricalColumn({title: 'Order'}),
  CategoricalColumn({title: 'Family'}),
];

const rows = AnimalData.map(row => {
  return {
    id: row.Name,
    data: [row.Name, row.Kingdom, row.Phylum, row.Class, row.Order, row.Family],
  };
});

export const component = () => {
  return (
    <div style={{height: '600px', width: '700px'}}>
      <Unstable_StatefulDataTable columns={columns} rows={rows} />
    </div>
  );
};
