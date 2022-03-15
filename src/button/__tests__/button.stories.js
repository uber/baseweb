/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import { Scenario as ButtonCircle } from './button-circle.scenario.js';
import { Scenario as ButtonColors } from './button-colors.scenario.js';
import { Scenario as ButtonEnhancersCompact } from './button-enhancers-compact.scenario.js';
import { Scenario as ButtonEnhancers } from './button-enhancers.scenario.js';
import { Scenario as ButtonShapes } from './button-shapes.scenario.js';
import { Scenario as ButtonSizesLoading } from './button-sizes-loading.scenario.js';
import { Scenario as ButtonSizes } from './button-sizes.scenario.js';
import { Scenario as ButtonDefault } from './button.scenario.js';

export const Circle = () => <ButtonCircle />;
export const Colors = () => <ButtonColors />;
export const EnhancersCompact = () => <ButtonEnhancersCompact />;
export const Enhancers = () => <ButtonEnhancers />;
export const Shapes = () => <ButtonShapes />;
export const SizesLoading = () => <ButtonSizesLoading />;
export const Sizes = () => <ButtonSizes />;
export const Button = () => <ButtonDefault />;

export default {
  title: 'Button',
};
