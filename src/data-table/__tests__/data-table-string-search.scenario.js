/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {useStyletron} from '../../styles/index.js';

import BooleanColumn from '../column-boolean.js';
import CategoricalColumn from '../column-categorical.js';
import CustomColumn from '../column-custom.js';
import NumericalColumn from '../column-numerical.js';
import StringColumn from '../column-string.js';
import {COLUMNS, NUMERICAL_FORMATS} from '../constants.js';
import {Unstable_DataTable} from '../data-table.js';

import AnimalData from './animal-data.js';

export const name = 'data-table-string-search';

const columns = [
  StringColumn({title: 'Name'}),
  CategoricalColumn({title: 'Kingdom'}),
  CategoricalColumn({title: 'Phylum'}),
  CategoricalColumn({title: 'Class'}),
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
    <div style={{height: '800px', width: '900px'}}>
      <Unstable_DataTable columns={columns} rows={rows} />
    </div>
  );
};
