/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import { Scenario as NumberedStepsScenario } from './numbered-steps.scenario.js';
import { Scenario as ProgressStepOverridesScenario } from './progress-step-overrides.scenario.js';
import { Scenario as ProgressStepsIsActive } from './progress-steps-isActive.scenario.js';
import { Scenario as ProgressStepsNumber } from './progress-steps-number.scenario.js';
import { Scenario as ProgressStepsDefault } from './progress-steps.scenario.js';

export const NumberedSteps = () => <NumberedStepsScenario />;
export const ProgressStepOverrides = () => <ProgressStepOverridesScenario />;
export const IsActive = () => <ProgressStepsIsActive />;
export const Number = () => <ProgressStepsNumber />;
export const ProgressSteps = () => <ProgressStepsDefault />;

export default {
  title: 'ProgressSteps',
};
