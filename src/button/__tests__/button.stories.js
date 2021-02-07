/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import ButtonDefault from './button.scenario.js';
import ButtonCircle from './button-circle.scenario.js';
import ButtonEnhancersCompact from './button-enhancers-compact.scenario.js';
import ButtonEnhancers from './button-enhancers.scenario.js';
import ButtonShapes from './button-shapes.scenario.js';
import ButtonSizes from './button-sizes.scenario.js';
import ButtonSizesLoading from './button-sizes-loading.scenario.js';

export const Button = () => <ButtonDefault />;
export const Circle = () => <ButtonCircle />;
export const EnhancersCompact = () => <ButtonEnhancersCompact />;
export const Enhancers = () => <ButtonEnhancers />;
export const Shapes = () => <ButtonShapes />;
export const Sizess = () => <ButtonSizes />;
export const SizesLoading = () => <ButtonSizesLoading />;
