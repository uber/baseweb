/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { Scenario as PinCodeMask } from './pin-code-mask.scenario';
import { Scenario as PinCodeOverrides } from './pin-code-overrides.scenario';
import { Scenario as PinCodeSizes } from './pin-code-sizes.scenario';
import { Scenario as PinCodeStates } from './pin-code-states.scenario';
import { Scenario as PinCodeDefault } from './pin-code.scenario';

export const Mask = () => <PinCodeMask />;
export const Overrides = () => <PinCodeOverrides />;
export const Sizes = () => <PinCodeSizes />;
export const States = () => <PinCodeStates />;
export const PinCode = () => <PinCodeDefault />;
