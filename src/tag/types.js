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
  /** Include or exclude the "x" button and click action. */
  closeable?: boolean,
  /** Disable control from being changed. */
  disabled?: boolean,
  isFocused?: boolean,
  isHovered?: boolean,
  kind?: TagKindT,
  /** Component or String value for label of tag. Default is empty string. */
  children?: React$Node,
  /** The color theme to be applied to a Tag. Default is `KIND.primary`. */
  color?: string,
  /** Handler for events on Action button element. `children` provides which Tag was clicked. */
  onActionClick: (
    e: SyntheticEvent<HTMLInputElement>,
    children?: React$Node,
  ) => void,
  $theme?: *,
};

export type SharedPropsT = {
  $closeable?: boolean,
  $color?: string,
  $disabled?: boolean,
  $isActive?: boolean,
  $isFocused?: boolean,
  $isHovered?: boolean,
  $kind?: string,
  $theme?: *,
};
