/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import NumberedSteps from './numbered-steps.scenario.js';
import ProgressStepOverrides from './progress-step-overrides.scenario.js';
import ProgressStepsIsActive from './progress-steps-isActive.scenario.js';
import ProgressStepsNumber from './progress-steps-number.scenario.js';
import ProgressStepsDefault from './progress-steps.scenario.js';

export const NumberedSteps = () => <NumberedSteps />;
export const ProgressStepOverrides = () => <ProgressStepOverrides />;
export const IsActive = () => <ProgressStepsIsActive />;
export const Number = () => <ProgressStepsNumber />;
export const ProgressSteps = () => <ProgressStepsDefault />;
