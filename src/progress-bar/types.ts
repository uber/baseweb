/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type * as React from 'react';
import type { Override } from '../helpers/overrides';
import type { SIZE, INTENT } from './constants';

export type Size = keyof typeof SIZE;
export type Intent = keyof typeof INTENT;

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
  /**
   * @deprecated This prop is deprecated and will be removed in a future version.
   * Use proper error UI patterns instead (Banner, Alert, Toast) as aria-invalid and aria-errormessage
   * are not semantically correct for progress bars per WAI-ARIA 1.2.
   * This prop is ignored and has no effect.
   */
  errorMessage?: string;
  /** The function that returns a progress bar label to display. */
  getProgressLabel: (value: number, maxValue: number, minValue: number) => React.ReactNode;
  /** If set to true, there’s and infinite loading animation. */
  infinite: boolean;
  /** The visual intent/variant of the progress bar. */
  intent?: Intent;
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
  $intent?: Intent;
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
  /** The accessible label for the progress bar. Defaults to percentage if not provided. */
  ariaLabel?: string;
  'aria-label'?: string;
  /** Overrides for sub-nodes in the rendering tree. */
  overrides?: ProgressBarRoundedOverrides;
};
