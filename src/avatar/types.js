/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import type {ThemeT} from '../styles/types.js';
import type {OverrideT} from '../helpers/overrides.js';

export type StylePropsT = {|
  $didImageFailToLoad: boolean,
  $size?: string,
  $theme: ThemeT,
|};

export type OverridesT<T> = {|
  Avatar?: OverrideT<T>,
  Initials?: OverrideT<T>,
  Root?: OverrideT<T>,
|};

export type StateT = {|
  didImageFailToLoad: boolean,
|};

export type PropsT = {|
  /** Defines an alternative text description of the image. */
  name: string,
  overrides?: OverridesT<StylePropsT>,
  /** Defines the width/height of the image. Accepts labels from theme.sizing, or passes value to height/width. */
  size?: string,
  /** Image to display. */
  src: string,
|};
