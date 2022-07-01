/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { Scenario as ProgressbarNegativeScenario } from './progressbar-negative.scenario';
import { Scenario as ProgressbarRoundedAnimatedScenario } from './progressbar-rounded-animated.scenario';
import { Scenario as ProgressbarRoundedOverridesScenario } from './progressbar-rounded-overrides.scenario';
import { Scenario as ProgressbarRoundedScenario } from './progressbar-rounded.scenario';
import { Scenario as ProgressbarScenario } from './progressbar.scenario';

export const ProgressbarNegative = () => <ProgressbarNegativeScenario />;
export const ProgressbarRoundedAnimated = () => <ProgressbarRoundedAnimatedScenario />;

export const ProgressbarRoundedOverrides = () => <ProgressbarRoundedOverridesScenario />;

export const ProgressbarRounded = () => <ProgressbarRoundedScenario />;
export const Progressbar = () => <ProgressbarScenario />;
