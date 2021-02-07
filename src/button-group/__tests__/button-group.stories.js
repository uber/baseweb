/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import ButtonGroupCheckbox from './button-group-checkbox.scenario.js';
import ButtonGroupDisabled from './button-group-disabled.scenario.js';
import ButtonGroupOverrides from './button-group-overrides.scenario.js';
import ButtonGroupPill from './button-group-pill.scenario.js';
import ButtonGroupRadio from './button-group-radio.scenario.js';
import ButtonGroupSizes from './button-group-sizes.scenario.js';

export const Checkbox = () => <ButtonGroupCheckbox />;
export const Disabled = () => <ButtonGroupDisabled />;
export const Overrides = () => <ButtonGroupOverrides />;
export const Pill = () => <ButtonGroupPill />;
export const Radio = () => <ButtonGroupRadio />;
export const Sizes = () => <ButtonGroupSizes />;
