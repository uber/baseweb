/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import defaultFilterOptions from './utils/default-filter-options';
import { TYPE, SIZE } from './constants';

const defaultProps = {
  // @ts-ignore
  'aria-label': null,
  // @ts-ignore
  'aria-describedby': null,
  // @ts-ignore
  'aria-errormessage': null,
  // @ts-ignore
  'aria-labelledby': null,
  autoFocus: false,
  backspaceRemoves: true,
  clearable: true,
  closeOnSelect: true,
  creatable: false,
  deleteRemoves: true,
  disabled: false,
  error: false,
  positive: false,
  escapeClearsValue: true,
  filterOptions: defaultFilterOptions,
  filterOutSelected: true,
  // @ts-ignore
  getOptionLabel: null,
  // @ts-ignore
  getValueLabel: null,
  ignoreCase: true,
  isLoading: false,
  labelKey: 'label',
  maxDropdownHeight: '40vh',
  multi: false,
  onBlur: () => {},
  onBlurResetsInput: true,
  onChange: () => {},
  onFocus: () => {},
  onInputChange: () => {},
  onCloseResetsInput: true,
  onSelectResetsInput: true,
  // @ts-ignore
  onOpen: null,
  // @ts-ignore
  onClose: null,
  openOnClick: true,
  startOpen: false,
  // @ts-ignore
  options: [],
  overrides: {},
  required: false,
  searchable: true,
  size: SIZE.default,
  type: TYPE.select,
  // @ts-ignore
  value: [],
  valueKey: 'id',
};

export default defaultProps;
