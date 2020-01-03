/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

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
  disabled?: boolean,
  /** A helper rendered at the end of the button. */
  endEnhancer?: (*) => React$Node | React$Node,
  /** Show loading button style and spinner. */
  isLoading?: boolean,
  /** Indicates that the button is selected */
  isSelected?: boolean,
  /** Defines the kind (purpose) of a button */
  kind?: $Keys<typeof KIND>,
  onClick?: (SyntheticEvent<HTMLButtonElement>) => mixed,
  overrides?: OverridesT,
  /** Defines the shape of the button */
  shape?: $Keys<typeof SHAPE>,
  /** Defines the size of the button */
  size?: $Keys<typeof SIZE>,
  /** A helper rendered at the start of the button. */
  startEnhancer?: (*) => React$Node | React$Node,
  type?: 'submit' | 'reset' | 'button',
};

export type SharedStylePropsT = {
  $kind?: $Keys<typeof KIND>,
  $isSelected?: boolean,
  $shape?: $Keys<typeof SHAPE>,
  $size?: $Keys<typeof SIZE>,
  $isLoading?: boolean,
  $disabled?: boolean,
};
