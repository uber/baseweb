/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import type {OverrideT} from '../helpers/overrides';

export type TagTypesT = 'primary' | 'warning' | 'positive' | 'negative';

export type OverridesT = {
  Root?: OverrideT<*>,
  Action?: OverrideT<*>,
  ActionIcon?: OverrideT<*>,
};

export type PropsT = {
  overrides?: OverridesT,
  disabled?: boolean,
  isFocused?: boolean,
  isHovered?: boolean,
  tagType?: TagTypesT,
  backgroundColor?: string | ((obj: SharedPropsT) => string),
  children?: React$Node,
  color?: string,
  hoverBackgroundColor?: string | ((obj: SharedPropsT) => string),
  $theme?: *,
  onActionClick: (
    e: SyntheticEvent<HTMLInputElement>,
    children?: React$Node,
  ) => void,
};

export type SharedPropsT = {
  $backgroundColor?: string | ((obj: SharedPropsT) => string),
  $color?: string,
  $disabled?: boolean,
  $isActive?: boolean,
  $isFocused?: boolean,
  $isHovered?: boolean,
  $hoverBackgroundColor?: string | ((obj: SharedPropsT) => string),
  $tagType?: string,
  $theme?: *,
};
