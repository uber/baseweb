/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { SIZE, DEFAULT_MAX_DROPDOWN_HEIGHT, DEFAULT_MAX_DROPDOWN_WIDTH } from './constants';

const defaultProps = {
  'aria-label': 'Please enter a phone number without the country dial code.',
  // @ts-ignore
  'aria-describedby': null,
  // @ts-ignore
  'aria-labelledby': null,
  clearable: true,
  focusLock: false,
  country: { label: 'United States', id: 'US', dialCode: '+1' },
  disabled: false,
  error: false,
  // @ts-ignore
  id: null,
  maxDropdownHeight: DEFAULT_MAX_DROPDOWN_HEIGHT,
  maxDropdownWidth: DEFAULT_MAX_DROPDOWN_WIDTH,
  // @ts-ignore
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
