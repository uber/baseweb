/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import { Scenario as ProgressbarNegativeScenario } from './progressbar-negative.scenario.js';
import { Scenario as ProgressbarRoundedAnimatedScenario } from './progressbar-rounded-animated.scenario.js';
import { Scenario as ProgressbarRoundedOverridesScenario } from './progressbar-rounded-overrides.scenario.js';
import { Scenario as ProgressbarRoundedScenario } from './progressbar-rounded.scenario.js';
import { Scenario as ProgressbarScenario } from './progressbar.scenario.js';

export const ProgressbarNegative = () => <ProgressbarNegativeScenario />;
export const ProgressbarRoundedAnimated = () => <ProgressbarRoundedAnimatedScenario />;

export const ProgressbarRoundedOverrides = () => <ProgressbarRoundedOverridesScenario />;

export const ProgressbarRounded = () => <ProgressbarRoundedScenario />;
export const Progressbar = () => <ProgressbarScenario />;

export default {
  title: 'ProgressBar',
};
