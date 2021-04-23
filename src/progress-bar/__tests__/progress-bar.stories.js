/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import ProgressbarNegativeScenario from './progressbar-negative.scenario.js';
import ProgressbarRoundedAnimatedScenario from './progressbar-rounded-animated.scenario.js';
import ProgressbarRoundedOverridesScenario from './progressbar-rounded-overrides.scenario.js';
import ProgressbarRoundedScenario from './progressbar-rounded.scenario.js';
import ProgressbarScenario from './progressbar.scenario.js';

export const ProgressbarNegative = () => <ProgressbarNegativeScenario />;
export const ProgressbarRoundedAnimated = () => (
  <ProgressbarRoundedAnimatedScenario />
);
export const ProgressbarRoundedOverrides = () => (
  <ProgressbarRoundedOverridesScenario />
);
export const ProgressbarRounded = () => <ProgressbarRoundedScenario />;
export const Progressbar = () => <ProgressbarScenario />;
