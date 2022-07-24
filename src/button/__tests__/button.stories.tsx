/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { Scenario as ButtonCircle } from './button-circle.scenario';
import { Scenario as ButtonColors } from './button-colors.scenario';
import { Scenario as ButtonEnhancersCompact } from './button-enhancers-compact.scenario';
import { Scenario as ButtonEnhancers } from './button-enhancers.scenario';
import { Scenario as ButtonShapes } from './button-shapes.scenario';
import { Scenario as ButtonSizesLoading } from './button-sizes-loading.scenario';
import { Scenario as ButtonSizes } from './button-sizes.scenario';
import { Scenario as ButtonDefault } from './button.scenario';

export const Circle = () => <ButtonCircle />;
export const Colors = () => <ButtonColors />;
export const EnhancersCompact = () => <ButtonEnhancersCompact />;
export const Enhancers = () => <ButtonEnhancers />;
export const Shapes = () => <ButtonShapes />;
export const SizesLoading = () => <ButtonSizesLoading />;
export const Sizes = () => <ButtonSizes />;
export const Button = () => <ButtonDefault />;
