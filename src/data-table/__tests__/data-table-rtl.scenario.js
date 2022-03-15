/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import { columns, rows } from './data-table.scenario.js';
import { DataTable } from '../index.js';

import Alert from '../../icon/alert.js';
import Check from '../../icon/check.js';

const rowActions = [
  {
    label: 'Check',
    onClick: ({ row }) => {},
    renderIcon: function RenderCheck({ size }) {
      return <Check size={size} />;
    },
  },
  {
    label: 'Remove',
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
