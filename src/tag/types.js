/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import type {OverrideT} from '../helpers/overrides.js';
import {COLOR_STYLE_KEYS} from './constants.js';

export const TagKind = Object.freeze({...COLOR_STYLE_KEYS, custom: null});

export type TagKindT = $Keys<typeof TagKind>;

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
  kind?: TagKindT,
  children?: React$Node,
  color?: string,
  $theme?: *,
  onActionClick: (
    e: SyntheticEvent<HTMLInputElement>,
    children?: React$Node,
  ) => void,
};

export type SharedPropsT = {
  $color?: string,
  $disabled?: boolean,
  $isActive?: boolean,
  $isFocused?: boolean,
  $isHovered?: boolean,
  $kind?: string,
  $theme?: *,
};
