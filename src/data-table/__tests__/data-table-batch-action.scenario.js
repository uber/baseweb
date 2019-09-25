/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import Alert from '../../icon/alert.js';
import Check from '../../icon/check.js';
import {useStyletron} from '../../styles/index.js';

import BooleanColumn from '../column-boolean.js';
import CategoricalColumn from '../column-categorical.js';
import CustomColumn from '../column-custom.js';
import NumericalColumn from '../column-numerical.js';
import StringColumn from '../column-string.js';
import {COLUMNS, NUMERICAL_FORMATS} from '../constants.js';
import {Unstable_DataTable} from '../data-table.js';

export const name = 'data-table-batch-action';

const columns = [
  NumericalColumn({title: 'one'}),
  NumericalColumn({title: 'two'}),
  NumericalColumn({title: 'three'}),
  NumericalColumn({title: 'four'}),
];

const rows = [
  {id: 1, data: [1, 0, 0, 0]},
  {id: 2, data: [2, 0, 0, 0]},
  {id: 3, data: [3, 0, 0, 0]},
  {id: 4, data: [4, 0, 0, 0]},
  {id: 5, data: [5, 0, 0, 0]},
  {id: 6, data: [6, 0, 0, 0]},
  {id: 7, data: [7, 0, 0, 0]},
  {id: 8, data: [8, 0, 0, 0]},
  {id: 9, data: [9, 0, 0, 0]},
  {id: 10, data: [10, 0, 0, 0]},
  {id: 11, data: [11, 0, 0, 0]},
  {id: 12, data: [12, 0, 0, 0]},
];

const batchActions = [
  {label: 'Star', onClick: ({rows}) => console.log(rows), renderIcon: Alert},
  {
    label: 'Approve',
    onClick: ({clearSelection}) => {
      console.log('click approve... clearing selection');
      clearSelection();
    },
    renderIcon: Check,
  },
  {
    label: 'Download',
    onClick: () => console.log('click download'),
  },
];

export const component = () => {
  return (
    <div style={{height: '800px', width: '900px'}}>
      <Unstable_DataTable
        batchActions={batchActions}
        columns={columns}
        onSelectionChange={rows => console.log('selection change:', rows)}
        rows={rows}
      />
    </div>
  );
};
