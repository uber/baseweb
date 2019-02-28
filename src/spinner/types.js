/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import type {OverrideT} from '../helpers/overrides.js';

export type SpinnerPropsT = {
  /** Size of element, will be passed to the svg width/height style. Can also be a value included in */
  size?: number | string,
  /** Color of icon, will be used as svg fill */
  color?: string,
  /** Allows you to set the SVG `<title>` label, which is used for accessibility */
  title?: string,
  overrides?: {
    Svg?: OverrideT<*>,
    ActivePath?: OverrideT<*>,
    TrackPath?: OverrideT<*>,
  },
};
