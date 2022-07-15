/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import type { Override } from '../helpers/overrides';
import { SIZE } from './constants';

export type Size = keyof typeof SIZE;

export type ProgressBarOverrides = {
  Root?: Override;
  BarContainer?: Override;
  Bar?: Override;
  BarProgress?: Override;
  InfiniteBar?: Override;
  Label?: Override;
};

export type ProgressBarProps = {
  /** The accessible label for the progress bar (getProgressLabel will be used if not provided) */
  ariaLabel?: string;
  'aria-label'?: string;
  children?: React.ReactNode;
  /** Error message for screen-reader users**/
  errorMessage?: string;
  /** The function that returns a progress bar label to display. */
  getProgressLabel: (value: number, maxValue: number, minValue: number) => React.ReactNode;
  /** If set to true, there’s and infinite loading animation. */
  infinite: boolean;
  overrides?: ProgressBarOverrides;
  /** If set to false, label is hidden and `getProgressLabel` is ignored. */
  showLabel: boolean;
  /** Defines the size (thickness) of the progress bar. */
  size: Size;
  /** Renders a sectional progress bar. Value should be set to a positive number larger than one. */
  steps: number;
  /** A custom completion value. Should be replaced by maxValue prop. */
  successValue: number;
  /** Maximum possible value. */
  maxValue: number;
  /** Minimum possible value. */
  minValue: number;
  /** The value between `0` and `100 | successValue` of the progress indicator. */
  value: number;
};

export type StyleProps = {
  $infinite: boolean;
  $index: number;
  $size: Size;
  $steps: number;
  $successValue: number;
  $minValue: number;
  $maxValue: number;
  $value: number;
};

export type ProgressBarRoundedOverrides = {
  Root?: Override;
  Svg?: Override;
  TrackBackground?: Override;
  TrackForeground?: Override;
  Text?: Override;
};

export type ProgressBarRoundedProps = {
  /** A number between 0 and 1 inclusive. Example: 0.75. */
  progress?: number;
  /** The size of the progress bar. */
  size?: Size;
  /** Toggle animating progress. */
  animate?: boolean;
  /** Toggle container rendering as a block or inline. */
  inline?: boolean;
  /** Overrides for sub-nodes in the rendering tree. */
  overrides?: ProgressBarRoundedOverrides;
};
