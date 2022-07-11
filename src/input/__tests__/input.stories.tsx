/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { Scenario as InputBeforeAfter } from './input-before-after.scenario';
import { Scenario as InputClearableIconOverrides } from './input-clearable-icon-overrides.scenario';
import { Scenario as InputClearableNoescape } from './input-clearable-noescape.scenario';
import { Scenario as InputClearable } from './input-clearable.scenario';
import { Scenario as InputDisabledMatchesSelect } from './input-disabled-matches-select.scenario';
import { Scenario as InputFormControlStates } from './input-form-control-states.scenario';
import { Scenario as InputMask } from './input-mask.scenario';
import { Scenario as InputNumber } from './input-number.scenario';
import { Scenario as InputPassword } from './input-password.scenario';
import { Scenario as InputPasswordIconOverrides } from './input-password-icon-overrides.scenario';
import { Scenario as InputSelector } from './input-selector.scenario';
import { Scenario as InputSizes } from './input-sizes.scenario';
import { Scenario as InputStates } from './input-states.scenario';
import { Scenario as InputWithButton } from './input-with-button.scenario';
import { Scenario as InputDefault } from './input.scenario';

export const BeforeAfter = () => <InputBeforeAfter />;
export const ClearableIconOverrides = () => <InputClearableIconOverrides />;
export const ClearableNoescape = () => <InputClearableNoescape />;
export const Clearable = () => <InputClearable />;
export const DisabledMatchesSelect = () => <InputDisabledMatchesSelect />;
export const Mask = () => <InputMask />;
export const FormControlStates = () => <InputFormControlStates />;
export const Number = () => <InputNumber />;
export const Password = () => <InputPassword />;
export const PasswordIconOverrides = () => <InputPasswordIconOverrides />;
export const Selector = () => <InputSelector />;
export const Sizes = () => <InputSizes />;
export const States = () => <InputStates />;
export const WithButton = () => <InputWithButton />;
export const Input = () => <InputDefault />;
