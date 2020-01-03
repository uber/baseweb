/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {
  SIZE,
  DEFAULT_MAX_DROPDOWN_HEIGHT,
  DEFAULT_MAX_DROPDOWN_WIDTH,
} from './constants.js';

const defaultProps = {
  'aria-label': 'Please choose a country dial code and enter a phone number.',
  'aria-describedby': null,
  'aria-labelledby': null,
  autoFocus: false,
  country: {label: 'United States', id: 'US', dialCode: '+1'},
  disabled: false,
  error: false,
  id: null,
  maxDropdownHeight: DEFAULT_MAX_DROPDOWN_HEIGHT,
  maxDropdownWidth: DEFAULT_MAX_DROPDOWN_WIDTH,
  name: null,
  onCountryChange: () => {},
  onTextChange: () => {},
  overrides: {},
  positive: false,
  required: false,
  size: SIZE.default,
  text: '',
};

export default defaultProps;
