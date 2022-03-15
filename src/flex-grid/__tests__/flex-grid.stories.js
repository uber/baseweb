/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import { Scenario as FlexGridFractionalPixel } from './flex-grid-fractional-pixel.scenario.js';
import { Scenario as FlexGridMissing } from './flex-grid-missing.scenario.js';
import { Scenario as FlexGridResponsive } from './flex-grid-responsive.scenario.js';
import { Scenario as FlexGridUnequalNarrow } from './flex-grid-unequal-narrow.scenario.js';
import { Scenario as FlexGridUnequalWide } from './flex-grid-unequal-wide.scenario.js';
import { Scenario as FlexGridDefault } from './flex-grid.scenario.js';

export const FractionalPixel = () => <FlexGridFractionalPixel />;
export const Missing = () => <FlexGridMissing />;
export const Responsive = () => <FlexGridResponsive />;
export const UnequalNarrow = () => <FlexGridUnequalNarrow />;
export const UnequalWide = () => <FlexGridUnequalWide />;
export const FlexGrid = () => <FlexGridDefault />;

export default {
  title: 'FlexGrid',
};
