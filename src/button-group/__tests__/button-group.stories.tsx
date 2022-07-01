/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import { Scenario as ButtonGroupCheckbox } from './button-group-checkbox.scenario.js';
import { Scenario as ButtonGroupDisabled } from './button-group-disabled.scenario.js';
import { Scenario as ButtonGroupSelected } from './button-group-selected.scenario.js';
import { Scenario as ButtonGroupSelectedDisabled } from './button-group-selected-disabled.scenario.js';
import { Scenario as ButtonGroupOverrides } from './button-group-overrides.scenario.js';
import { Scenario as ButtonGroupPill } from './button-group-pill.scenario.js';
import { Scenario as ButtonGroupRadio } from './button-group-radio.scenario.js';
import { Scenario as ButtonGroupSizes } from './button-group-sizes.scenario.js';

export const Checkbox = () => <ButtonGroupCheckbox />;
export const Disabled = () => <ButtonGroupDisabled />;
export const Selected = () => <ButtonGroupSelected />;
export const SelectedDisabled = () => <ButtonGroupSelectedDisabled />;
export const Overrides = () => <ButtonGroupOverrides />;
export const Pill = () => <ButtonGroupPill />;
export const Radio = () => <ButtonGroupRadio />;
export const Sizes = () => <ButtonGroupSizes />;
