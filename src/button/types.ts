/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { KIND, SIZE, SHAPE } from './constants';
import type { OverrideT } from '../helpers/overrides';

import type { ReactNode, SyntheticEvent } from 'react';

export type OverridesT = {
  Root?: OverrideT;
  BaseButton?: OverrideT;
  StartEnhancer?: OverrideT;
  EndEnhancer?: OverrideT;
  LoadingSpinnerContainer?: OverrideT;
  LoadingSpinner?: OverrideT;
};

export type CustomColorsT = {
  backgroundColor: string;
  color: string;
};

export type ButtonPropsT = {
  children?: ReactNode;
  colors?: CustomColorsT;
  disabled?: boolean;
  /** A helper rendered at the end of the button. */
  // flowlint-next-line unclear-type:off
  endEnhancer?: React.ReactNode | React.ComponentType<any>;
  /** Show loading button style and spinner. */
  isLoading?: boolean;
  /** Indicates that the button is selected */
  isSelected?: boolean;
  /** Defines the kind (purpose) of a button */
  kind?: keyof typeof KIND;
  onClick?: (a: SyntheticEvent<HTMLButtonElement>) => unknown;
  overrides?: OverridesT;
  /** Defines the shape of the button */
  shape?: keyof typeof SHAPE;
  /** Defines the size of the button */
  size?: keyof typeof SIZE;
  /** A helper rendered at the start of the button. */
  // flowlint-next-line unclear-type:off
  startEnhancer?: React.ReactNode | React.ComponentType<any>;
  type?: 'submit' | 'reset' | 'button';
};

export type SharedStylePropsT = {
  $colors?: CustomColorsT;
  $kind?: keyof typeof KIND;
  $isSelected?: boolean;
  $shape?: keyof typeof SHAPE;
  $size?: keyof typeof SIZE;
  $isLoading?: boolean;
  $disabled?: boolean;
  $isFocusVisible: boolean;
};
