/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { Scenario as RadioAlign } from './radio-align.scenario';
import { Scenario as RadioContainsInteractiveLabel } from './radio-interactive-label.scenario';
import { Scenario as RadioLabelPlacement } from './radio-label-placement.scenario';
import { Scenario as RadioStates } from './radio-states.scenario';
import { Scenario as RadioDefault } from './radio.scenario';

export const Align = () => <RadioAlign />;
export const ContainsInteractiveLabel = () => <RadioContainsInteractiveLabel />;
export const LabelPlacement = () => <RadioLabelPlacement />;
export const Radio = () => <RadioDefault />;
export const States = () => <RadioStates />;
