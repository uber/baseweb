/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type * as React from 'react';

import type { Override } from '../helpers/overrides';
import { KIND, VARIANT, SIZE } from './constants';

export const TagKind = Object.freeze(KIND);
export const TagVariant = Object.freeze(VARIANT);
export const TagSize = Object.freeze(SIZE);

export type TagKind = keyof typeof TagKind;
export type TagVariant = (typeof TagVariant)[keyof typeof TagVariant];
export type TagSize = keyof typeof TagSize;

export type TagOverrides = {
  Root?: Override;
  Action?: Override;
  ActionIcon?: Override;
  StartEnhancerContainer?: Override;
  Text?: Override;
};

export type TagProps = {
  overrides?: TagOverrides;
  /** Include or exclude the "x" button and click action. */
  closeable?: boolean;
  /** Disable control from being changed. */
  disabled?: boolean;
  /** Deprecated. Will be removed in the next major version. */
  isFocused?: boolean;
  /** Deprecated. Will be removed in the next major version. */
  isHovered?: boolean;
  /** Defines tags look by purpose. Set it to one of KIND[key] values. Defaults to KIND.primary */
  kind?: TagKind;
  /** Defines tags look. Set it to one of VARIANT[key] values. Defaults to VARIANT.light */
  variant?: TagVariant;
  /** Component or String value for label of tag. Default is empty string. */
  children?: React.ReactNode;
  /** The color theme to be applied to a Tag. Default is `KIND.primary`. */
  color?: string;
  /** Text to display in native OS tooltip on long hover. */
  title?: string;
  /** onClick handler for the action button element. */
  onActionClick?: (e: Event, children?: React.ReactNode) => unknown;
  /** keydown handler for the action button element. */
  onActionKeyDown?: (e: Event, children?: React.ReactNode) => unknown;
  /** onClick handler for the tag. Passing an onClick handler also makes the tag clickable. */
  onClick?: null | ((event: Event) => unknown);
  /** onkeydown handler for the tag. */
  onKeyDown?: null | ((event: Event) => unknown);
  /** Determines the size of the Tag. */
  size?: TagSize;
  startEnhancer?: React.ComponentType<{}>;
  contentMaxWidth?: string | null;
};

export type SharedPropsArg = {
  $clickable?: boolean;
  $closeable?: boolean;
  $color?: string;
  $disabled?: boolean;
  $isActive?: boolean;
  $isFocused?: boolean;
  $isHovered?: boolean;
  $kind?: string;
  $variant?: string;
  $isFocusVisible?: boolean;
  $size?: string;
  $contentMaxWidth?: string | null;
};
