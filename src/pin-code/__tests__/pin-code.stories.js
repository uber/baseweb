/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import PinCodeMask from './pin-code-mask.scenario.js';
import PinCodeOverrides from './pin-code-overrides.scenario.js';
import PinCodeSizes from './pin-code-sizes.scenario.js';
import PinCodeStates from './pin-code-states.scenario.js';
import PinCodeDefault from './pin-code.scenario.js';

export const Mask = () => <PinCodeMask />;
export const Overrides = () => <PinCodeOverrides />;
export const Sizes = () => <PinCodeSizes />;
export const States = () => <PinCodeStates />;
export const PinCode = () => <PinCodeDefault />;
