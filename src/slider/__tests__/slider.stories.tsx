/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import { Scenario as SliderCustomLabel } from './slider-custom-label.scenario.js';
import { Scenario as SliderDisabled } from './slider-disabled.scenario.js';
import { Scenario as SliderMarks } from './slider-marks.scenario.js';
import { Scenario as SliderRange } from './slider-range.scenario.js';
import { Scenario as SliderStep } from './slider-step.scenario.js';
import { Scenario as SliderAlwaysShowLabel } from './slider-always-show-label.scenario.js';
import { Scenario as SliderRtl } from './slider-rtl.scenario.js';
import { Scenario as SliderDefault } from './slider.scenario.js';

export const CustomLabel = () => <SliderCustomLabel />;
export const Disabled = () => <SliderDisabled />;
export const Marks = () => <SliderMarks />;
export const Range = () => <SliderRange />;
export const Step = () => <SliderStep />;
export const AlwaysShowLabel = () => <SliderAlwaysShowLabel />;
export const Rtl = () => <SliderRtl />;
export const Slider = () => <SliderDefault />;
