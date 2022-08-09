/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { columns, rows } from './data-table.scenario';
import { DataTable } from '..';

import Alert from '../../icon/alert';
import Check from '../../icon/check';

const rowActions = [
  {
    label: 'Check',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onClick: ({ row }) => {},
    renderIcon: function RenderCheck({ size }) {
      return <Check size={size} />;
    },
  },
  {
    label: 'Remove',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onClick: ({ row }) => {},
    renderIcon: function RenderAlert({ size }) {
      return <Alert size={size} />;
    },
  },
];

export function Scenario() {
  return (
    <div style={{ height: '800px', width: '900px' }}>
      <DataTable columns={columns} rows={rows} rowActions={rowActions} />
    </div>
  );
}
