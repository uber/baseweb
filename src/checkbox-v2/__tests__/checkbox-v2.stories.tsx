/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { Scenario as CheckboxIndeterminate } from './checkbox-v2-indeterminate.scenario';
import { Scenario as CheckboxPlacement } from './checkbox-v2-placement.scenario';
import { Scenario as CheckboxStates } from './checkbox-v2-states.scenario';
import { Scenario as CheckboxUnlabeled } from './checkbox-v2-unlabeled.scenario';
import { Scenario as CheckboxDefault } from './checkbox-v2.scenario';
import { Scenario as CheckboxReactHookForm } from './checkbox-v2-react-hook-form.scenario';
import { Scenario as CheckboxAutoFocus } from './checkbox-v2-auto-focus.scenario';

export const Indeterminate = () => <CheckboxIndeterminate />;
export const Placement = () => <CheckboxPlacement />;
export const States = () => <CheckboxStates />;
export const Unlabeled = () => <CheckboxUnlabeled />;
export const Checkbox = () => <CheckboxDefault />;
export const ReactHookForm = () => <CheckboxReactHookForm />;
export const AutoFocus = () => <CheckboxAutoFocus />;

export default {
  meta: {
    runtimeErrorsAllowed: true,
  },
};
