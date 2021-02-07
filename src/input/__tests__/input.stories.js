/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import InputBeforeAfter from './input-before-after.scenario.js';
import InputClearableNoescape from './input-clearable-noescape.scenario.js';
import InputClearable from './input-clearable.scenario.js';
import InputDisabledMatchesSelect from './input-disabled-matches-select.scenario.js';
import InputMask from './input-mask.scenario.js';
import InputNumber from './input-number.scenario.js';
import InputPassword from './input-password.scenario.js';
import InputSelector from './input-selector.scenario.js';
import InputSizes from './input-sizes.scenario.js';
import InputStates from './input-states.scenario.js';
import InputWithButton from './input-with-button.scenario.js';
import InputDefault from './input.scenario.js';

export const BeforeAfter = () => <InputBeforeAfter />;
export const ClearableNoescape = () => <InputClearableNoescape />;
export const Clearable = () => <InputClearable />;
export const DisabledMatchesSelect = () => <InputDisabledMatchesSelect />;
export const Mask = () => <InputMask />;
export const Number = () => <InputNumber />;
export const Password = () => <InputPassword />;
export const Selector = () => <InputSelector />;
export const Sizes = () => <InputSizes />;
export const States = () => <InputStates />;
export const WithButton = () => <InputWithButton />;
export const Input = () => <InputDefault />;
