/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import type { OverrideT } from '../helpers/overrides.js';

export type InitialsStylePropsT = {};
export type AvatarStylePropsT = {
  $didImageFailToLoad?: boolean,
  $imageLoaded?: boolean,
  $size?: string,
};
export type RootStylePropsT = {
  $didImageFailToLoad: boolean,
  $size?: string,
};
export type StylePropsT = RootStylePropsT;

export type OverridesT = {|
  Avatar?: OverrideT,
  Initials?: OverrideT,
  Root?: OverrideT,
|};

export type PropsT = {|
  /** Bypasses initial generation from provided name with this value. */
  initials?: string,
  /** Defines an alternative text description of the image. */
  name?: string,
  overrides?: OverridesT,
  /** Defines the width/height of the image. Accepts labels from theme.sizing, or passes value to height/width. */
  size?: string,
  /** Image to display. */
  src?: string,
|};
