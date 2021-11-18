/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {Scenario as PinCodeMask} from './pin-code-mask.scenario.js';
import {Scenario as PinCodeOverrides} from './pin-code-overrides.scenario.js';
import {Scenario as PinCodeSizes} from './pin-code-sizes.scenario.js';
import {Scenario as PinCodeStates} from './pin-code-states.scenario.js';
import {Scenario as PinCodeDefault} from './pin-code.scenario.js';

export const Mask = () => <PinCodeMask />;
export const Overrides = () => <PinCodeOverrides />;
export const Sizes = () => <PinCodeSizes />;
export const States = () => <PinCodeStates />;
export const PinCode = () => <PinCodeDefault />;
