/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import CheckboxIndeterminate from './checkbox-indeterminate.scenario.js';
import CheckboxPlacement from './checkbox-placement.scenario.js';
import CheckboxStates from './checkbox-states.scenario.js';
import CheckboxToggleRound from './checkbox-toggle-round.scenario.js';
import CheckboxToggle from './checkbox-toggle.scenario.js';
import CheckboxUnlabeled from './checkbox-unlabeled.scenario.js';
import CheckboxSelect from './checkbox-select.scenario.js';
import CheckboxDefault from './checkbox.scenario.js';

export const Indeterminate = () => <CheckboxIndeterminate />;
export const Placement = () => <CheckboxPlacement />;
export const States = () => <CheckboxStates />;
export const ToggleRound = () => <CheckboxToggleRound />;
export const Toggle = () => <CheckboxToggle />;
export const Unlabeled = () => <CheckboxUnlabeled />;
export const Select = () => <CheckboxSelect />;
export const Checkbox = () => <CheckboxDefault />;
