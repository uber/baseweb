/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import ButtonCircle from './button-circle.scenario.js';
import ButtonEnhancersCompact from './button-enhancers-compact.scenario.js';
import ButtonEnhancers from './button-enhancers.scenario.js';
import ButtonShapes from './button-shapes.scenario.js';
import ButtonSizesLoading from './button-sizes-loading.scenario.js';
import ButtonSizes from './button-sizes.scenario.js';
import ButtonDefault from './button.scenario.js';

export const Circle = () => <ButtonCircle />;
export const EnhancersCompact = () => <ButtonEnhancersCompact />;
export const Enhancers = () => <ButtonEnhancers />;
export const Shapes = () => <ButtonShapes />;
export const SizesLoading = () => <ButtonSizesLoading />;
export const Sizes = () => <ButtonSizes />;
export const Button = () => <ButtonDefault />;
