/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-disable flowtype/generic-spacing */
import * as React from 'react';
import type {ThemeT} from '../styles/types';
import type {OverrideT} from '../helpers/overrides';

export type OverridesT = {
  Svg?: OverrideT<StyledComponentArgsT>,
};

export type SizeT = number | string;
export type ColorT = string;

export type StyledComponentArgsT = {
  $size?: SizeT,
  $color?: ColorT,
  // Styletron stuff
  $as?: string,
  // styled function wrapper related
  $style?: ?{},
  $ref?: React.Ref<*>,
};

export type StyledComponentParamsT = StyledComponentArgsT & {
  $theme: ThemeT,
};

export type IconPropsT = {
  children?: React.Node,
  size?: SizeT,
  color?: ColorT,
  title?: string,
  overrides?: OverridesT,
};
