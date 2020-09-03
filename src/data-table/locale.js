/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

export type DataTableLocaleT = {|
  emptyState: string,
  loadingState: string,
  addFilter: string,
  optionsLabel: string,
  optionsSearch: string,
  optionsEmpty: string,
  exclude: string,
  apply: string,
  searchAriaLabel: string,
  selectAll: string,
  clearSelection: string,
  categoriesEmpty: string,
  range: string,
  categorical: string,
  singleValue: string,
|};

const locale = {
  emptyState:
    'No rows match the filter criteria defined. Please remove one or more filters to view more data.',
  loadingState: 'Loading Rows.',
  addFilter: 'Add Fitler',
  optionsLabel: 'Select column to filter by',
  optionsSearch: 'Search for a column to filter by...',
  optionsEmpty: 'No columns available.',
  exclude: 'Exclude',
  apply: 'Apply',
  searchAriaLabel: 'Search by text',
  selectAll: 'Select All',
  clearSelection: 'Clear',
  categoriesEmpty: 'No Categories Found',
  range: 'Range',
  categorical: 'Categorical',
  singleValue: 'Single Value',
};

export default locale;
