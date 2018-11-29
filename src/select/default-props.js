/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import defaultFilterOptions from './utils/default-filter-options';
import {TYPE, SIZE} from './constants';

const defaultProps = {
  'aria-label': null,
  'aria-describedby': null,
  'aria-labelledby': null,
  autoFocus: false,
  backspaceRemoves: true,
  clearable: true,
  closeOnSelect: true,
  deleteRemoves: true,
  disabled: false,
  error: false,
  escapeClearsValue: true,
  filterOptions: defaultFilterOptions,
  filterOutSelected: true,
  getOptionLabel: null,
  getValueLabel: null,
  isLoading: false,
  labelKey: 'label',
  maxDropdownHeight: '900px',
  multi: false,
  noResultsMsg: 'No results found',
  onBlur: () => {},
  onBlurResetsInput: true,
  onChange: () => {},
  onFocus: () => {},
  onInputChange: () => {},
  onCloseResetsInput: true,
  onSelectResetsInput: true,
  onOpen: null,
  onClose: null,
  openOnClick: true,
  options: [],
  overrides: {},
  placeholder: 'Select...',
  required: false,
  searchable: true,
  size: SIZE.default,
  type: TYPE.select,
  value: [],
  valueKey: 'id',
};

export default defaultProps;
