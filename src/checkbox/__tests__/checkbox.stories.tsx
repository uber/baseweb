/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { Scenario as CheckboxIndeterminate } from './checkbox-indeterminate.scenario';
import { Scenario as CheckboxPlacement } from './checkbox-placement.scenario';
import { Scenario as CheckboxSelect } from './checkbox-select.scenario';
import { Scenario as CheckboxStates } from './checkbox-states.scenario';
import { Scenario as CheckboxToggle } from './checkbox-toggle.scenario';
import { Scenario as CheckboxUnlabeled } from './checkbox-unlabeled.scenario';
import { Scenario as CheckboxDefault } from './checkbox.scenario';
import { Scenario as CheckboxReactHookForm } from './checkbox-react-hook-form.scenario';

export const Indeterminate = () => <CheckboxIndeterminate />;
export const Placement = () => <CheckboxPlacement />;
export const Select = () => <CheckboxSelect />;
export const States = () => <CheckboxStates />;
export const Toggle = () => <CheckboxToggle />;
export const Unlabeled = () => <CheckboxUnlabeled />;
export const Checkbox = () => <CheckboxDefault />;
export const ReactHookForm = () => <CheckboxReactHookForm />;
