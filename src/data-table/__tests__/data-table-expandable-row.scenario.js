/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import Alert from '../../icon/alert.js';
import Check from '../../icon/check.js';

import BooleanColumn from '../column-boolean.js';
import NumericalColumn from '../column-numerical.js';
import {Unstable_DataTable} from '../data-table.js';

export const name = 'data-table-expandable-row';

const columns = [
  NumericalColumn({title: 'row-id'}),
  BooleanColumn({title: 'is-it-flagged'}),
];

function buildRow(index) {
  return {
    id: index,
    data: [index, false],
    children: [
      {id: `${index}-1`, data: [6, false]},
      {id: `${index}-2`, data: [7, false]},
      {id: `${index}-3`, data: [8, false]},
      {id: `${index}-4`, data: [9, false]},
    ],
  };
}

const rows = [];
for (let i = 0; i < 200; i++) {
  rows.push(buildRow(i));
}

export const component = () => {
  return (
    <div style={{height: '800px', width: '900px'}}>
      <Unstable_DataTable columns={columns} rows={rows} />
    </div>
  );
};
