/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { Scenario as SliderCustomLabel } from './slider-custom-label.scenario';
import { Scenario as SliderDisabled } from './slider-disabled.scenario';
import { Scenario as SliderMarks } from './slider-marks.scenario';
import { Scenario as SliderRange } from './slider-range.scenario';
import { Scenario as SliderStep } from './slider-step.scenario';
import { Scenario as SliderAlwaysShowLabel } from './slider-always-show-label.scenario';
import { Scenario as SliderRtl } from './slider-rtl.scenario';
import { Scenario as SliderDefault } from './slider.scenario';

export const CustomLabel = () => <SliderCustomLabel />;
export const Disabled = () => <SliderDisabled />;
export const Marks = () => <SliderMarks />;
export const Range = () => <SliderRange />;
export const Step = () => <SliderStep />;
export const AlwaysShowLabel = () => <SliderAlwaysShowLabel />;
export const Rtl = () => <SliderRtl />;
export const Slider = () => <SliderDefault />;
