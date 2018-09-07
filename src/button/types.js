/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {KIND, SIZE, SHAPE} from './constants';
import type {OverrideT} from '../helpers/overrides';

export type OverridesT = {
  BaseButton?: OverrideT<*>,
  StartEnhancer?: OverrideT<*>,
  EndEnhancer?: OverrideT<*>,
};

export type ButtonPropsT = {
  startEnhancer?: () => React$Node | React$Node,
  endEnhancer?: () => React$Node | React$Node,
  disabled?: boolean,
  overrides?: OverridesT,
  size?: $Keys<typeof SIZE>,
  kind?: $Keys<typeof KIND>,
  shape?: $Keys<typeof SHAPE>,
  children?: React$Node,
};
