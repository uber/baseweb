/*
Copyright (c) 2018 Uber Technologies, Inc.

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
  getProgressLabel: (value: number, successValue: number) => React.Node,
  value: number,
  successValue: number,
  showLabel: boolean,
  overrides?: OverridesT,
};
