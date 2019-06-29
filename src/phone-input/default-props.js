/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {SIZE, COUNTRIES} from './constants.js';

const defaultProps = {
  'aria-label': null,
  'aria-describedby': null,
  'aria-labelledby': null,
  autoFocus: false,
  country: COUNTRIES.US,
  disabled: false,
  error: false,
  id: null,
  maxDropdownHeight: '400px',
  maxDropdownWidth: '400px',
  name: null,
  onCountryChange: () => {},
  onTextChange: () => {},
  overrides: {},
  positive: false,
  size: SIZE.default,
  text: '',
};

export default defaultProps;
