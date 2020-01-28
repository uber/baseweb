/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import {SIZE} from '../input/index.js';

const defaultProps = {
  'aria-label': 'Please enter your pin code',
  'aria-labelledby': null,
  'aria-describedby': null,
  autoFocus: false,
  disabled: false,
  error: false,
  id: null,
  name: null,
  onChange: () => {},
  overrides: {},
  placeholder: '○',
  positive: false,
  required: false,
  size: SIZE.default,
  manageFocus: true,
  values: ['', '', '', ''],
};

export default defaultProps;
