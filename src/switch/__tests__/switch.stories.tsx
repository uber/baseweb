
/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { Scenario as SwitchDisabled } from './switch-disabled.scenario';
import { Scenario as SwitchPlacement } from './switch-placement.scenario';
import { Scenario as SwitchStates } from './switch-states.scenario';
import { Scenario as SwitchUnlabeled } from './switch-unlabeled.scenario';
import { Scenario as SwitchDefault } from './switch.scenario';
import { Scenario as SwitchAutoFocus } from './switch-auto-focus.scenario';
import { Scenario as SwitchSizes } from './switch-sizes.scenario';

export const Placement = () => <SwitchPlacement />;
export const States = () => <SwitchStates />;
export const Unlabeled = () => <SwitchUnlabeled />;
export const Switch = () => <SwitchDefault />;
export const AutoFocus = () => <SwitchAutoFocus />;
export const Size = () => <SwitchSizes />;
export const Disabled = () => <SwitchDisabled />;

export default {
  meta: {
    runtimeErrorsAllowed: true,
  },
};
