/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { Override } from '../helpers/overrides';

export type InitialsStyleProps = {};
export type AvatarStyleProps = {
  $didImageFailToLoad?: boolean;
  $imageLoaded?: boolean;
  $size?: string;
};
export type RootStyleProps = {
  $didImageFailToLoad: boolean;
  $size?: string;
};
export type StyleProps = RootStyleProps;

export type AvatarOverrides = {
  Avatar?: Override;
  Initials?: Override;
  Root?: Override;
};

export type AvatarProps = {
  /** Bypasses initial generation from provided name with this value. */
  initials?: string;
  /** Defines an alternative text description of the image. */
  name?: string;
  overrides?: AvatarOverrides;
  /** Defines the width/height of the image. Accepts labels from theme.sizing, or passes value to height/width. */
  size?: string;
  /** Image to display. */
  src?: string;
};
