/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import ProgressbarNegative from './progressbar-negative.scenario.js';
import ProgressbarRoundedAnimated from './progressbar-rounded-animated.scenario.js';
import ProgressbarRoundedOverrides from './progressbar-rounded-overrides.scenario.js';
import ProgressbarRounded from './progressbar-rounded.scenario.js';
import Progressbar from './progressbar.scenario.js';

export const ProgressbarNegative = () => <ProgressbarNegative />;
export const ProgressbarRoundedAnimated = () => <ProgressbarRoundedAnimated />;
export const ProgressbarRoundedOverrides = () => (
  <ProgressbarRoundedOverrides />
);
export const ProgressbarRounded = () => <ProgressbarRounded />;
export const Progressbar = () => <Progressbar />;
