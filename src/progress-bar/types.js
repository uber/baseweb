/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

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
  Bar?: OverrideT,
  BarProgress?: OverrideT,
  Label?: OverrideT,
};

export type ProgressBarPropsT = {
  children?: React.Node,
  /** Error message for screen-reader users**/
  errorMessage?: string,
  /** The function that returns a progress bar label to display. */
  getProgressLabel: (value: number, successValue: number) => React.Node,
  /** If set to true, there’s and infinite loading animation. */
  infinite: boolean,
  overrides?: OverridesT,
  /** If set to false, label is hidden and `getProgressLabel` is ignored. */
  showLabel: boolean,
  /** Defines the size (thickness) of the progress bar. */
  size: SizeT,
  /** A custom completion value. Should be deleted in v11. */
  successValue: number,
  /** The value between `0` and `100 | successValue` of the progress indicator. */
  value: number,
};

export type StylePropsT = {
  $infinite: boolean,
  $size: SizeT,
  $successValue: number,
  $value: number,
};
