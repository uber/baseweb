/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import type {OverrideT} from '../helpers/overrides.js';
import {COLOR_STYLE_KEYS, VARIANT} from './constants.js';

export const TagKind = Object.freeze({...COLOR_STYLE_KEYS, custom: null});

export type TagKindT = $Keys<typeof TagKind>;
export type TagVariantT = $Values<typeof VARIANT>;

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
  variant?: TagVariantT,
  /** Component or String value for label of tag. Default is empty string. */
  children?: React$Node,
  /** The color theme to be applied to a Tag. Default is `KIND.primary`. */
  color?: string,
  /** Handler for events on Action button element. `children` provides which Tag was clicked. */
  onActionClick: (e: Event, children?: React$Node) => void,
  /** Handler for events on Action button element. `children` provides which Tag was clicked. */
  onActionKeyDown: (e: Event, children?: React$Node) => void,
  /** Passing an onVlivk handler that also makes the tag clickable. */
  onClick?: null | ((event: Event) => mixed),
  onKeyDown?: null | ((event: Event) => mixed),
  $theme?: *,
};

export type SharedPropsT = {
  $clickable?: boolean,
  $closeable?: boolean,
  $color?: string,
  $disabled?: boolean,
  $isActive?: boolean,
  $isFocused?: boolean,
  $isHovered?: boolean,
  $kind?: string,
  $theme?: *,
  $variant?: string,
};
