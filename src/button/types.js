/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {KIND, SIZE, SHAPE} from './constants.js';
import type {OverrideT} from '../helpers/overrides.js';

export type OverridesT = {
  BaseButton?: OverrideT<*>,
  StartEnhancer?: OverrideT<*>,
  EndEnhancer?: OverrideT<*>,
  LoadingSpinnerContainer?: OverrideT<*>,
  LoadingSpinner?: OverrideT<*>,
};

export type ButtonPropsT = {
  children?: React$Node,
  disabled: boolean,
  endEnhancer?: (*) => React$Node | React$Node,
  isLoading: boolean,
  isSelected?: boolean,
  kind: $Keys<typeof KIND>,
  onClick?: (SyntheticEvent<HTMLButtonElement>) => void,
  overrides: OverridesT,
  shape: $Keys<typeof SHAPE>,
  size: $Keys<typeof SIZE>,
  startEnhancer?: (*) => React$Node | React$Node,
};

export type SharedStylePropsT = {
  $kind?: $Keys<typeof KIND>,
  $isSelected?: boolean,
  $shape?: $Keys<typeof SHAPE>,
  $size?: $Keys<typeof SIZE>,
  $isLoading?: boolean,
  $disabled?: boolean,
};
