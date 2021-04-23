/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import NumberedStepsScenario from './numbered-steps.scenario.js';
import ProgressStepOverridesScenario from './progress-step-overrides.scenario.js';
import ProgressStepsIsActive from './progress-steps-isActive.scenario.js';
import ProgressStepsNumber from './progress-steps-number.scenario.js';
import ProgressStepsDefault from './progress-steps.scenario.js';

export const NumberedSteps = () => <NumberedStepsScenario />;
export const ProgressStepOverrides = () => <ProgressStepOverridesScenario />;
export const IsActive = () => <ProgressStepsIsActive />;
export const Number = () => <ProgressStepsNumber />;
export const ProgressSteps = () => <ProgressStepsDefault />;
