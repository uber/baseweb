/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';

import { KIND, SIZE, SHAPE } from './constants.js';
import type { OverrideT } from '../helpers/overrides.js';

export type ReactRefT<T> = {| current: null | T |};

export type ReactRefT<T> = {|current: null | T|};

export type OverridesT = {
  Root?: OverrideT,
  BaseButton?: OverrideT,
  StartEnhancer?: OverrideT,
  EndEnhancer?: OverrideT,
  LoadingSpinnerContainer?: OverrideT,
  LoadingSpinner?: OverrideT,
};

export type CustomColorsT = {|
  backgroundColor: string,
  color: string,
|};

export type ButtonPropsT = {
  children?: React$Node,
  colors?: CustomColorsT,
  disabled?: boolean,
  /** A helper rendered at the end of the button. */
  // flowlint-next-line unclear-type:off
  endEnhancer?: React.Node | React.AbstractComponent<any>,
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
  // flowlint-next-line unclear-type:off
  startEnhancer?: React.Node | React.AbstractComponent<any>,
  type?: 'submit' | 'reset' | 'button',
};

export type SharedStylePropsT = {
  $colors?: CustomColorsT,
  $kind?: $Keys<typeof KIND>,
  $isSelected?: boolean,
  $shape?: $Keys<typeof SHAPE>,
  $size?: $Keys<typeof SIZE>,
  $isLoading?: boolean,
  $disabled?: boolean,
  $isFocusVisible: boolean,
};
