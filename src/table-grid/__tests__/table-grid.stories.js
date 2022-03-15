/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import { Scenario as TableGridJobs } from './table-grid-jobs.scenario.js';
import { Scenario as TableGridRecords } from './table-grid-records.scenario.js';
import { Scenario as TableGridSortable } from './table-grid-sortable.scenario.js';
import { Scenario as TableGridDefault } from './table-grid.scenario.js';

export const Jobs = () => <TableGridJobs />;
export const Records = () => <TableGridRecords />;
export const Sortable = () => <TableGridSortable />;
export const TableGrid = () => <TableGridDefault />;

export default {
  title: 'TableGrid',
};
