/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { Scenario as NumberedStepsScenario } from './numbered-steps.scenario';
import { Scenario as NumberedStepsIconOverridesScenario } from './numbered-steps-icon-overrides.scenario';
import { Scenario as ProgressStepOverridesScenario } from './progress-step-overrides.scenario';
import { Scenario as ProgressStepsIsActive } from './progress-steps-isActive.scenario';
import { Scenario as ProgressStepsNumber } from './progress-steps-number.scenario';
import { Scenario as ProgressStepsDefault } from './progress-steps.scenario';

export const NumberedSteps = () => <NumberedStepsScenario />;
export const NumberedStepsIconOverrides = () => <NumberedStepsIconOverridesScenario />;
export const ProgressStepOverrides = () => <ProgressStepOverridesScenario />;
export const IsActive = () => <ProgressStepsIsActive />;
export const Number = () => <ProgressStepsNumber />;
export const ProgressSteps = () => <ProgressStepsDefault />;
