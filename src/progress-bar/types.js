/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import type {OverrideT} from '../helpers/overrides.js';
import {SIZE} from './constants.js';

export type SizeT = $Keys<typeof SIZE>;

export type OverridesT = {
  Root?: OverrideT,
  BarContainer?: OverrideT,
  Bar?: OverrideT,
  BarProgress?: OverrideT,
  InfiniteBar?: OverrideT,
  Label?: OverrideT,
};

export type ProgressBarPropsT = {
  /** The accessible label for the progress bar (getProgressLabel will be used if not provided) */
  ariaLabel?: string,
  'aria-label'?: string,
  children?: React.Node,
  /** Error message for screen-reader users**/
  errorMessage?: string,
  /** The function that returns a progress bar label to display. */
  getProgressLabel: (
    value: number,
    maxValue: number,
    minValue: number,
  ) => React.Node,
  /** If set to true, there’s and infinite loading animation. */
  infinite: boolean,
  overrides?: OverridesT,
  /** If set to false, label is hidden and `getProgressLabel` is ignored. */
  showLabel: boolean,
  /** Defines the size (thickness) of the progress bar. */
  size: SizeT,
  /** Renders a sectional progress bar. Value should be set to a positive number larger than one. */
  steps: number,
  /** A custom completion value. Should be replaced by maxValue prop. */
  successValue: number,
  /** Maximum possible value. */
  maxValue: number,
  /** Minimum possible value. */
  minValue: number,
  /** The value between `0` and `100 | successValue` of the progress indicator. */
  value: number,
};

export type StylePropsT = {
  $infinite: boolean,
  $index: number,
  $size: SizeT,
  $steps: number,
  $successValue: number,
  $minValue: number,
  $maxValue: number,
  $value: number,
};

export type ProgressBarRoundedPropsT = {
  /** A number between 0 and 1 inclusive. Example: 0.75. */
  progress?: number,
  /** The size of the progress bar. */
  size?: SizeT,
  /** Toggle animating progress. */
  animate?: boolean,
  /** Toggle container rendering as a block or inline. */
  inline?: boolean,
  /** Overrides for sub-nodes in the rendering tree. */
  overrides?: {
    Root?: OverrideT,
    Svg?: OverrideT,
    TrackBackground?: OverrideT,
    TrackForeground?: OverrideT,
    Text?: OverrideT,
  },
};
