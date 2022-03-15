/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import { Scenario as CheckboxIndeterminate } from './checkbox-indeterminate.scenario.js';
import { Scenario as CheckboxPlacement } from './checkbox-placement.scenario.js';
import { Scenario as CheckboxSelect } from './checkbox-select.scenario.js';
import { Scenario as CheckboxStates } from './checkbox-states.scenario.js';
import { Scenario as CheckboxToggleRound } from './checkbox-toggle-round.scenario.js';
import { Scenario as CheckboxToggle } from './checkbox-toggle.scenario.js';
import { Scenario as CheckboxUnlabeled } from './checkbox-unlabeled.scenario.js';
import { Scenario as CheckboxDefault } from './checkbox.scenario.js';
import { Scenario as CheckboxReactHookForm } from './checkbox-react-hook-form.scenario.js';

export const Indeterminate = () => <CheckboxIndeterminate />;
export const Placement = () => <CheckboxPlacement />;
export const Select = () => <CheckboxSelect />;
export const States = () => <CheckboxStates />;
export const ToggleRound = () => <CheckboxToggleRound />;
export const Toggle = () => <CheckboxToggle />;
export const Unlabeled = () => <CheckboxUnlabeled />;
export const Checkbox = () => <CheckboxDefault />;
export const ReactHookForm = () => <CheckboxReactHookForm />;

export default {
  title: 'Checkbox',
};
