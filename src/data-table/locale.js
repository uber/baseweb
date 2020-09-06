/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

export type DataTableLocaleT = {|
  emptyState: string,
  loadingState: string,
  searchAriaLabel: string,
  filterAdd: string,
  filterExclude: string,
  filterApply: string,
  optionsLabel: string,
  optionsSearch: string,
  optionsEmpty: string,
  categoricalFilterSelectAll: string,
  categoricalFilterSelectClear: string,
  categoricalFilterEmpty: string,
  datetimeFilterRange: string,
  datetimeFilterCategorical: string,
  numericalFilterRange: string,
  numericalFilterSingleValue: string,
|};

const locale = {
  emptyState:
    'No rows match the filter criteria defined. Please remove one or more filters to view more data.',
  loadingState: 'Loading Rows.',
  searchAriaLabel: 'Search by text',
  filterAdd: 'Add Fitler',
  filterExclude: 'Exclude',
  filterApply: 'Apply',
  optionsLabel: 'Select column to filter by',
  optionsSearch: 'Search for a column to filter by...',
  optionsEmpty: 'No columns available.',
  categoricalFilterSelectAll: 'Select All',
  categoricalFilterSelectClear: 'Clear',
  categoricalFilterEmpty: 'No Categories Found',
  datetimeFilterRange: 'Range',
  datetimeFilterCategorical: 'Categorical',
  numericalFilterRange: 'Range',
  numericalFilterSingleValue: 'Single Value',
};

export default locale;
