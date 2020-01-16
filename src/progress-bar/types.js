/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import type {OverrideT} from '../helpers/overrides.js';

export type OverridesT = {
  Root?: OverrideT<*>,
  Bar?: OverrideT<*>,
  BarProgress?: OverrideT<*>,
  Label?: OverrideT<*>,
};

export type ProgressBarPropsT = {
  children?: React.Node,
  /** The function that returns a progress bar label to display. */
  getProgressLabel: (value: number, successValue: number) => React.Node,
  /** The value between `0` and `100 | successValue` of the progress indicator. */
  value: number,
  /** A custom completion value. */
  successValue: number,
  /** If set to false, label is hidden and `getProgressLabel` is ignored. */
  showLabel: boolean,
  overrides?: OverridesT,
};

export type StylePropsT = {
  $successValue: number,
  $value: number,
};
