/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { Scenario as ButtonGroupCheckbox } from './button-group-checkbox.scenario';
import { Scenario as ButtonGroupDisabled } from './button-group-disabled.scenario';
import { Scenario as ButtonGroupSelected } from './button-group-selected.scenario';
import { Scenario as ButtonGroupSelectedDisabled } from './button-group-selected-disabled.scenario';
import { Scenario as ButtonGroupOverrides } from './button-group-overrides.scenario';
import { Scenario as ButtonGroupPill } from './button-group-pill.scenario';
import { Scenario as ButtonGroupRadio } from './button-group-radio.scenario';
import { Scenario as ButtonGroupSizes } from './button-group-sizes.scenario';

export const Checkbox = () => <ButtonGroupCheckbox />;
export const Disabled = () => <ButtonGroupDisabled />;
export const Selected = () => <ButtonGroupSelected />;
export const SelectedDisabled = () => <ButtonGroupSelectedDisabled />;
export const Overrides = () => <ButtonGroupOverrides />;
export const Pill = () => <ButtonGroupPill />;
export const Radio = () => <ButtonGroupRadio />;
export const Sizes = () => <ButtonGroupSizes />;
