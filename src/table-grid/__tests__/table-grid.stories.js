/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import TableGridJobs from './table-grid-jobs.scenario.js';
import TableGridRecords from './table-grid-records.scenario.js';
import TableGridSortable from './table-grid-sortable.scenario.js';
import TableGridDefault from './table-grid.scenario.js';

export const Jobs = () => <TableGridJobs />;
export const Records = () => <TableGridRecords />;
export const Sortable = () => <TableGridSortable />;
export const TableGrid = () => <TableGridDefault />;
