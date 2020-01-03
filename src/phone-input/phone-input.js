/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import {COUNTRIES} from './constants.js';
import PhoneInputLite from './phone-input-lite.js';
import defaultProps from './default-props.js';
import type {PropsT} from './types.js';

PhoneInput.defaultProps = defaultProps;

export default function PhoneInput(props: PropsT) {
  return <PhoneInputLite {...props} countries={COUNTRIES} />;
}
