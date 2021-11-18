/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {Scenario as InputBeforeAfter} from './input-before-after.scenario.js';
import {Scenario as InputClearableNoescape} from './input-clearable-noescape.scenario.js';
import {Scenario as InputClearable} from './input-clearable.scenario.js';
import {Scenario as InputDisabledMatchesSelect} from './input-disabled-matches-select.scenario.js';
import {Scenario as InputFormControlStates} from './input-form-control-states.scenario.js';
import {Scenario as InputMask} from './input-mask.scenario.js';
import {Scenario as InputNumber} from './input-number.scenario.js';
import {Scenario as InputPassword} from './input-password.scenario.js';
import {Scenario as InputSelector} from './input-selector.scenario.js';
import {Scenario as InputSizes} from './input-sizes.scenario.js';
import {Scenario as InputStates} from './input-states.scenario.js';
import {Scenario as InputWithButton} from './input-with-button.scenario.js';
import {Scenario as InputDefault} from './input.scenario.js';

export const BeforeAfter = () => <InputBeforeAfter />;
export const ClearableNoescape = () => <InputClearableNoescape />;
export const Clearable = () => <InputClearable />;
export const DisabledMatchesSelect = () => <InputDisabledMatchesSelect />;
export const Mask = () => <InputMask />;
export const FormControlStates = () => <InputFormControlStates />;
export const Number = () => <InputNumber />;
export const Password = () => <InputPassword />;
export const Selector = () => <InputSelector />;
export const Sizes = () => <InputSizes />;
export const States = () => <InputStates />;
export const WithButton = () => <InputWithButton />;
export const Input = () => <InputDefault />;
