/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { COUNTRIES } from './constants';
import PhoneInputLite from './phone-input-lite';
import defaultProps from './default-props';
import type { PropsT } from './types';

PhoneInput.defaultProps = defaultProps;

export default function PhoneInput(props: PropsT) {
  return <PhoneInputLite {...props} countries={COUNTRIES} />;
}
