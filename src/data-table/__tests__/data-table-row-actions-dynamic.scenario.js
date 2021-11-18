/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import BooleanColumn from '../column-boolean.js';
import NumericalColumn from '../column-numerical.js';
import {StatefulDataTable} from '../stateful-data-table.js';

import {ArrowUp, ArrowDown, Check} from '../../icon/index.js';

type RowDataT = [boolean, number];

const columns = [
  BooleanColumn({
    title: 'boolean value',
    mapDataToValue: (data: RowDataT) => data[0],
  }),

  NumericalColumn({
    title: 'numerical value',
    mapDataToValue: (data: RowDataT) => data[1],
  }),
];

const rows = [];
for (let i = 0; i < 100; i++) {
  rows.push({id: i, data: [i % 2 ? true : false, i + 1]});
}

export function Scenario() {
  const rowActions = React.useCallback(row => {
    const actions = [
      {
        label: 'stable-action-icon',
        onClick: () => {},
        renderIcon: function RenderArrow({size}) {
          if (row.data[0] === true) {
            return <ArrowUp size={size} />;
          } else {
            return <ArrowDown size={size} />;
          }
        },
      },
    ];

    if (row.data[0] === true) {
      actions.push({
        label: 'dynamic-action-icon',
        onClick: () => {},
        renderIcon: function RenderCheck({size}) {
          return <Check size={size} />;
        },
      });
    }

    return actions;
  }, []);

  return (
    <div>
      <div style={{height: '500px', width: '400px'}}>
        <StatefulDataTable
          columns={columns}
          rows={rows}
          rowActions={rowActions}
        />
      </div>
    </div>
  );
}
